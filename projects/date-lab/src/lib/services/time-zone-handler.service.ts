import { Time } from "@angular/common";
import { Injectable } from "@angular/core";
import { timeZones } from "../assets/time-zones.data";
import { TimeZone } from "../interfaces/time-zone";

@Injectable({
  providedIn: 'root'
})
export class TimeZoneHandler {

  public timeZones: TimeZone[] = timeZones;

  public getTimeZoneByName(name: string): TimeZone {
    const foundTimeZone = this.timeZones.find((timeZone) => timeZone.timezone === name);
    if (!foundTimeZone) {
      const guessedTimeZone = this.guessTimeZone();
      console.warn('Time zone not found' + guessedTimeZone.timezone + ' Was used instead');
      return guessedTimeZone;
    }
    return foundTimeZone;
  }

  public guessTimeZone(): TimeZone {
    if (typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function') {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return this.getTimeZoneByName(timeZone);
    } else {
      return this.guessTimeZoneByOffset();;
    }
  }

  private guessTimeZoneByOffset(): TimeZone {
    const offset = -(new Date().getTimezoneOffset());
    const foundTimeZone = this.timeZones.find((timeZone) => timeZone.offset === offset);
    if (!foundTimeZone) {
      throw new Error('Time zone not found');
    }
    return foundTimeZone;
  }

  public isDaylightSavingTime(d: Date): boolean {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== d.getTimezoneOffset();
  }
}
