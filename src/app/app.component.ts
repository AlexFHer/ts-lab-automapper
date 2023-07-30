import { Component, OnInit } from '@angular/core';
import { AutoMapper } from "../../projects/auto-mapper/src/lib/classes";
import { ToyClass } from "./docs/auto-mapper/classes/toy";
import { userDtoToUserProfile } from "./docs/auto-mapper/interfaces/userProfile";
import { toyDtoMock } from "./docs/auto-mapper/mocks/toy.mocks";
import { userDtoMock, usersDtosMock } from "./docs/auto-mapper/mocks/user.mocks";
import { dtoToyToToyProfile } from "./docs/auto-mapper/profiles/toy.profile";




interface ToyDto {
  name: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public ngOnInit() {

  }
}
