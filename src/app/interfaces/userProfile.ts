
import { Profile } from "auto-mapper";
import { User } from "./user";
import { UserDto } from "./userDto";

const destinationInitialState: User = {
  id: '',
  email: '',
  city: '',
  fullName: '',
}

export const userProfile = new Profile<UserDto, User>(destinationInitialState)
.forMember('fullName', (source) => source.name + ' ' + source.surname)
