import moment from 'moment';

export default class DateTimeUtils {
  public static getDateString(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
