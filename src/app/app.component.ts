import { Component, OnInit } from '@angular/core';
import { AutoMapper } from "@ts-lab/auto-mapper";
import { UserDto } from "./interfaces/userDto";
import { userProfile } from "./interfaces/userProfile";

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

  public ngOnInit() {
    const user = AutoMapper.map(this.userDtoMock, userProfile);
    console.log(user);
  }
}
