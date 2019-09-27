import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import moment from 'moment';
import { ConfigService } from 'nestjs-config';

import DateTimeUtils from '../utils/DateTimeUtils';

import { TimeSheetEntryAuthor } from './interfaces/TimeSheetEntryAuthor.interface';
import { TimeSheetEntry } from './interfaces/TimeSheetEntry.interface';
import { TimeSheetEntriesInput } from './interfaces/TimeSheetEntriesInput';
import { Person } from './interfaces/Person.interface';
import { HolidayItem } from './interfaces/HolidayItem.interface';

@Injectable()
export class CalamariService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) { }

  private getPersonObject(author: TimeSheetEntryAuthor): Person {
    return {
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email,
    };
  }

  private async holidays({ from, to }: TimeSheetEntriesInput): Promise<HolidayItem[]> {
    return this.http
      .post('holiday/v1/find', { from, to, employee: this.config.get('calamari.employee') })
      .toPromise()
      .then(result => result.data)
      .catch(err => {
        throw new BadRequestException('calamari thrown error', err.message);
      });
  }

  private async isHoliday(date: Date): Promise<Boolean> {
    const dateString = DateTimeUtils.getDateString(date);

    const holidays = await this.holidays({ from: dateString, to: dateString });

    return holidays.length > 0;
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

  public async previousWorkingDay(date: Date): Promise<Date> {
    const previousBussinessDay = DateTimeUtils.getPreviousBusinessDay(date);

    const isHoliday = this.isHoliday(previousBussinessDay);

    if (isHoliday) {
      return this.previousWorkingDay(previousBussinessDay);
    }

    return previousBussinessDay;
  }
}
