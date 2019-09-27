import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import moment from 'moment';

import DateTimeUtils from '../utils/DateTimeUtils';

import { TimeSheetEntryAuthor } from './interfaces/TimeSheetEntryAuthor.interface';
import { TimeSheetEntry } from './interfaces/TimeSheetEntry.interface';
import { TimeSheetEntriesInput } from './interfaces/TimeSheetEntriesInput';
import { Person } from './interfaces/Person.interface';

@Injectable()
export class CalamariService {
  constructor(private readonly http: HttpService) {}

  private getPersonObject(author: TimeSheetEntryAuthor): Person {
    return {
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email,
    };
  }

  private async timesheetEntries({ from, to }: TimeSheetEntriesInput): Promise<TimeSheetEntry[]> {
    return this.http
      .post('clockin/timesheetentries/v1/find', { from, to })
      .toPromise()
      .then(result => result.data)
      .catch(err => {
        throw new BadRequestException('calamari thrown error', err.message);
      });
  }

  public async presentPeople(date: Date): Promise<Person[]> {
    const dateString = DateTimeUtils.getDateString(date);
    const timeSheetEntries = await this.timesheetEntries({ from: dateString, to: dateString });
    const getIsCorrectDay = (startTime) => moment(startTime).isSame(date, 'day');

    return timeSheetEntries.reduce((presentPeople, timeSheetEntry) => {
      // Calamari API returns all timesheet entries for requested date(s)
      // AND all timesheet entries that aren't finished, so we need to filter by start date
      const getIsInResults = () => presentPeople.find(({ email }) => email === timeSheetEntry.person.email);

      if (!getIsCorrectDay(timeSheetEntry.started) || getIsInResults()) return presentPeople;

      return [...presentPeople, this.getPersonObject(timeSheetEntry.person)];
    }, []);
  }
}
