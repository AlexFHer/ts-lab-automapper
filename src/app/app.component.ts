import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { AutoMapper } from "auto-mapper";
import { LDate } from "../../projects/date-lab/src/lib/classes/l-date";
import { UserDto } from "./interfaces/userDto";
import { userProfile } from "./interfaces/userProfile";
const jsonData = require('tzdata/timezone-data.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ts-tools-lib';

  userDtoMock: UserDto = {
    id: '1',
    name: 'John',
    city: 'New York',
    email: 'email@email.com',
    password: '********',
    surname: 'Doe'
  }

  constructor(
    private http: HttpClient
  ) {
  }

  public ngOnInit(): void {
    this.lDateTest();
    console.log(jsonData);
    // this.autoMapperTest();
  }

  private autoMapperTest(): void {
    const user = AutoMapper.map(this.userDtoMock, userProfile);

    console.log(user);
  }

  private lDateTest() {
    // random date in the past
    console.log(new Date('2023-07-20T12:00:00.000').toISOString());
    console.log(new Date('2023-07-20T12:00:00.000Z').toISOString());
    const lDateLisboa = new LDate(new Date('2021-01-01 15:00:00'), 'Europe/Lisbon', true);
    console.log(lDateLisboa.localDate);
    const lDate: LDate = new LDate(1689854400000, 'Europe/Madrid', false);
    console.log("unix", lDate.utcUnix);
    console.log("local date", lDate.localDate);
    console.log("local date formatted: ", lDate.formatLocalDate('DD/MM/YYYY HH:mm:ss.SSS'));
    console.log("utc date", lDate.utcDate);
    console.log("utc date formatted: ", lDate.formatUtcDate('DD/MM/YYYY HH:mm:ss.SSS'))
    console.log("utc date ISOString: ", lDate.isoString);
  }

}
