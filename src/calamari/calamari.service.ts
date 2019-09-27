import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import * as moment from 'moment';

type Person = {
  firstName: string;
  lastName: string;
  email: string;
};

type Author = {
  firstName: string;
  lastName: string;
  email: string;
  externalId: string;
};

type TimeSheetEntry = {
  id: number;
  started: Date;
  person: Author;
};

const getDateString = (date: Date) => moment.default(date).format('YYYY-MM-DD');

const getPersonObject: (Author) => (Person) = ({ firstName, lastName, email }) => ({
  firstName, lastName, email,
});

@Injectable()
export class CalamariService {
  constructor(private readonly http: HttpService) {}

  public async timesheetEntries({ from, to }: { from: string, to: string }): Promise<TimeSheetEntry[]> {
    return this.http
      .post('clockin/timesheetentries/v1/find', { from, to })
      .toPromise()
      .then(result => result.data)
      .catch(err => {
        throw new BadRequestException('calamari thrown error', err.message);
      });
  }

  public async presentPeople(date: Date): Promise<Person[]> {
    const dateString = getDateString(date);
    const timeSheetEntries = await this.timesheetEntries({ from: dateString, to: dateString });
    const getIsCorrectDay = (startTime) => moment.default(startTime).isSame(date, 'day');

    return timeSheetEntries.reduce((presentPeople, timeSheetEntry) => {
      // Calamari API returns all timesheet entries for requested date(s)
      // AND all timesheet entries that aren't finished, so we need to filter by start date
      const getIsInResults = () => presentPeople.find(({ email }) => email === timeSheetEntry.person.email);

      if (!getIsCorrectDay(timeSheetEntry.started) || getIsInResults()) return presentPeople;

      return [...presentPeople, getPersonObject(timeSheetEntry.person)];
    }, []);
  }
}
