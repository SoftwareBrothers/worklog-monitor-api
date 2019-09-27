import * as moment from 'moment';

export default class DateTimeUtils {
  public static getDateString(date: Date): string {
    return moment.default(date).format('YYYY-MM-DD');
  }
}
