import { Component, OnInit } from '@angular/core';
import { AutoMapper } from "../../../../projects/auto-mapper/src/lib/classes";
import { ToyClass } from "./classes/toy";
import { ToyDto } from "./interfaces/toyDto";
import { userDtoToUserProfile } from "./interfaces/userProfile";
import { toyDtoMock } from "./mocks/toy.mocks";
import { userDtoMock, usersDtosMock } from "./mocks/user.mocks";
import { dtoToyToToyProfile } from "./profiles/toy.profile";

@Component({
  selector: 'app-auto-mapper-test',
  templateUrl: './auto-mapper-docs.component.html',
  styleUrls: ['./auto-mapper-docs.component.scss']
})
export class AutoMapperDocsComponent implements OnInit {

    public mappedUser = AutoMapper.map(userDtoMock, userDtoToUserProfile);

    ngOnInit(): void {
      const user = AutoMapper.map(userDtoMock, userDtoToUserProfile);
      console.log(user);
      const mappedUsers = AutoMapper.mapArray(usersDtosMock, userDtoToUserProfile);
      console.log(mappedUsers);
      const mappedToy = AutoMapper.map<ToyDto, ToyClass>(toyDtoMock, dtoToyToToyProfile);
      console.log(mappedToy)
    }
}
