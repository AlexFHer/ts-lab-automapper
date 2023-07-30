import { AutoMapper } from "./auto-mapper";
import { Profile } from "./profile";

interface TestUser {
  id: string;
  fullName: string;
  config: {
    theme: string;
  }
}

interface TestUserDto {
  id: string;
  name: string;
  surname: string;
  additionalConfig: string;
}


describe('Auto mapper', () => {

  const userDto = {
    id: '1',
    name: 'John',
    surname: 'Doe',
    additionalConfig: '{"theme": "light"}'
  }

  const userDto2 = {
    id: '2',
    name: 'Jane',
    surname: 'Doe',
    additionalConfig: '{"theme": "dark"}'
  }

  const userProfileInitialState: TestUser = {
    id: '',
    fullName: '',
    config: {
      theme: ''
    }
  }

  const userProfile = new Profile<TestUserDto, TestUser>(userProfileInitialState)
  .forMember('fullName', (source) => source.name + ' ' + source.surname)
  .forMember('config', (source) => JSON.parse(source.additionalConfig));

  it('should create an instance', () => {
    expect(new AutoMapper()).toBeTruthy();
  });

  it('should map a single object', () => {
    const expectedUser = {
      id: '1',
      fullName: 'John Doe',
      config: {
        theme: 'light'
      }
    }

    const user = AutoMapper.map(userDto, userProfile);
    expect(user).toEqual(expectedUser);
  });

  it('should map an array of objects', () => {
    const expectedUsers = [
      {
        id: '1',
        fullName: 'John Doe',
        config: {
          theme: 'light'
        }
      },
      {
        id: '2',
        fullName: 'Jane Doe',
        config: {
          theme: 'dark'
        }
      }
    ]

    const userProfile = new Profile<TestUserDto, TestUser>(userProfileInitialState)
    .forMember('fullName', (source) => source.name + ' ' + source.surname)
    .forMember('config', (source) => JSON.parse(source.additionalConfig));

    const users = AutoMapper.mapArray([userDto, userDto2], userProfile);
    expect(users).toEqual(expectedUsers);
  });
});
