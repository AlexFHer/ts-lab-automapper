import { LDate } from "./l-date";

describe('L Date', () => {

  it('should create an instance', () => {
    expect(new LDate()).toBeTruthy();
  });

  it('should create local date if no parameters are given', function () {
    expect(new LDate().localDate.getHours()).toEqual(new Date().getHours());
  });

  it('should create local date as the date given', function () {
    const date = new Date('2023-01-01');
    expect(new LDate(date).localDate.getHours()).toEqual(date.getHours());
  });

  it('should create utc unix date when number given', function () {
    //  Thursday, 20 July 2023 12:00:00 to epoch: 1689854400000
    // DST is active in this date

    expect(new LDate(1689854400000, 'Europe/Lisbon', true).utcDate.getHours()).toEqual(12);
    expect(new LDate(1689854400000, 'Europe/Lisbon', true).localDate.getHours()).toEqual(13);

    expect(new LDate(1689854400000, 'Europe/Lisbon').localDate.getHours()).toEqual(13);
    expect(new LDate(1689854400000, 'Europe/Lisbon').utcDate.getHours()).toEqual(12);
  });

  it('should create local date based time zone when DST is true', function () {
    // DST is not active in this date
    const date = new Date('2023-01-01 15:00:00');
    const expectedHours = date.getHours();
    const timeZone = 'Europe/Lisbon';
    const lDate = new LDate(date, timeZone, true);
    expect(lDate.localDate.getHours()).toEqual(expectedHours);
  });

  it('should create local date based time zone when DST is true', function () {
    // DST is active in this date
    const date = new Date('2023-07-01 15:00:00');
    const expectedHours = date.getHours() + 1;
    const timeZone = 'Europe/Lisbon';
    const lDate = new LDate(date, timeZone, true);
    console.log(lDate);
    expect(lDate.localDate.getHours()).toEqual(expectedHours);
  });

});
