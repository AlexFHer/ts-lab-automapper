import { UserDto } from "../interfaces/userDto";

export const userDtoMock: UserDto = {
  id: '1',
  name: 'John',
  city: 'New York',
  email: 'email@email.com',
  password: '********',
  surname: 'Doe',
  config: '{"theme": "light"}'
}

export const usersDtosMock: UserDto[] = [
  userDtoMock,
  {
    id: '2',
    name: 'Eva',
    city: 'New York',
    email: ' ',
    password: ' ',
    surname: 'Dophi',
    config: '{"theme": "dark"}'
  }
];
