// Static class for date manipulation
import { timeZones } from "../assets/time-zones.data";
import { TimeZone } from "../interfaces/time-zone";
import { TimeFormatter } from "../services/time-formatter.service";
import { TimeZoneHandler } from "../services/time-zone-handler.service";
import { DateTypesUtils } from "../utils/date-types.utils";

export class LDate {

  private _utcUnix: number = 0;
  private _isDST: boolean = false;
  private _timeZone: TimeZone = timeZones[0];
  private _timeZoneHandler: TimeZoneHandler = new TimeZoneHandler();
  private _timeFormatter: TimeFormatter = new TimeFormatter();
  constructor(
    date?: Date | number,
    timeZone?: string,
    isUtc: boolean = false
  ){
    this._timeZone = this.retrieveTimeZone(timeZone);
    this.generateUnix(date, isUtc);
  }

  public get localDate(): Date {
    const calculatedUnix = this._utcUnix + this.getMachineOffsetInMilliseconds();
    const calculatedUnixPlusOffset = calculatedUnix + this.getTimeZoneOffsetInMilliseconds();
    return new Date(calculatedUnixPlusOffset);
  }

  public get utcDate(): Date {
    return new Date(this._utcUnix + this.getMachineOffsetInMilliseconds());
  }

  public get utcUnix(): number {
    return this._utcUnix;
  }

  public get isoString(): string {
    return this._timeFormatter.formatDateToIsoString(this.utcDate);
  }

  private convertLocalDateToUtcUnix(date: Date): number {
    const timeZoneOffsetMilliseconds = this.getTimeZoneOffsetInMilliseconds();
    const localDateEpoch = date.getTime() - this.getMachineOffsetInMilliseconds();
    return localDateEpoch - timeZoneOffsetMilliseconds;
  }

  private convertUtcDateToUtcUnix(date: Date): number {
    return date.getTime() - this.getMachineOffsetInMilliseconds();
  }

  private retrieveTimeZone(timeZone: string | undefined): TimeZone {
    return timeZone ? this._timeZoneHandler.getTimeZoneByName(timeZone) : this._timeZoneHandler.guessTimeZone();
  }

  private getTimeZoneOffsetInMilliseconds(): number {
    return (this._isDST ? this._timeZone.offset_dst : this._timeZone.offset) * 60000;
  }

  private getMachineOffsetInMilliseconds(): number {
    return new Date().getTimezoneOffset() * 60000;
  }

  public formatUtcDate(format: string): string {
    return this._timeFormatter.formatDate(this.utcDate, format);
  }

  public formatLocalDate(format: string): string {
    return this._timeFormatter.formatDate(this.localDate, format);
  }

  private checkDST(date: Date = new Date()): void {
    this._isDST = this._timeZoneHandler.isDaylightSavingTime(date);
  }

  private generateUnix(date: Date | number | string | undefined, isUtc: boolean): void {
    if (!date) {
      this.checkDST();
      this._utcUnix = new Date().getTime();
      return;
    }

    if (DateTypesUtils.isDate(date)) {
      this.checkDST(date);
      this._utcUnix = isUtc ? this.convertUtcDateToUtcUnix(date) : this.convertLocalDateToUtcUnix(date);
      return;
    }

    if (DateTypesUtils.isNumber(date)) {
      this._utcUnix = date;
      this.checkDST();
      return;
    }
  }
}
