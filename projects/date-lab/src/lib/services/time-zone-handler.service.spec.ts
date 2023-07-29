import { TestBed } from '@angular/core/testing';
import { TimeZoneHandler } from "./time-zone-handler.service";

describe('TzHandlerService', () => {
  let service: TimeZoneHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeZoneHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should recognise whether a date is DST or not', function (): void {
    expect(service.isDaylightSavingTime(new Date('2023-01-01'))).toBe(false);
    expect(service.isDaylightSavingTime(new Date('2023-07-01'))).toBe(true);
  });
});
