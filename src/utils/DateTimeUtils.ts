import moment from 'moment';

export default class DateTimeUtils {
  public static getDateString(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  private static getDaysSinceLastBusinessDay(day: number): number {
    /* eslint-disable indent */
    switch (day) {
      case 0: // Sunday -> Friday
        return 2;
      case 1: // Monday -> Friday
        return 3;
      default:
        return 1;
    }
    /* eslint-enable indent */
  }

  public static getPreviousBusinessDay(date: Date): Date {
    const day = moment(date).day();
    const daysToRemove = DateTimeUtils.getDaysSinceLastBusinessDay(day);

    return moment(date).subtract(daysToRemove, 'day').toDate();
  }
}
