export class DateTypesUtils {
  public static isDate(date: string | number | Date): date is Date {
    return date instanceof Date;
  }

  public static isNumber(date: string | number | Date): date is number {
    return typeof date === 'number';
  }

}
