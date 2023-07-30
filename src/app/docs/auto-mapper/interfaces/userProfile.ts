
import { Profile } from "../../../../../projects/auto-mapper/src/lib/classes";
import { User } from "./user";
import { UserDto } from "./userDto";

const destinationInitialState: User = {
  id: '',
  email: '',
  city: '',
  fullName: '',
  config: {
    theme: 'light'
  }
}

export const userDtoToUserProfile = new Profile<UserDto, User>(destinationInitialState)
  .forMember('fullName', (source) => source.name + ' ' + source.surname)
  .forMember('config', (source) => JSON.parse(source.config))
