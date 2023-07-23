# Auto mapper for Typescript

A very lightweight library to map objects in typescript from interfaces.

## Installation

```bash
npm install @ts-lab/auto-mapper
```

## Usage

Given these 2 interfaces:

```typescript
export interface UserDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  city: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  city: string;
}

```

We want to map from UserDto to User, so firstly a profile is created in which we define the mapping:

* The property full name, which is not provided in the source object, will be manually mapped

```typescript
import { Profile } from "@ts-lab/auto-mapper";

const destinationInitialState: User = {
  id: '',
  email: '',
  city: '',
  fullName: '',
}

export const userProfile = new Profile<UserDto, User>(destinationInitialState)
.forMember('fullName', (source) => source.name + ' ' + source.surname)
```

* An expected initial state is provided to the profile, which is used to create the destination object

* In case the property given does not exist in the destination object, an error will be thrown

```typescript
import { Profile } from "@ts-lab/auto-mapper";

const destinationInitialState: User = {
  id: '',
  email: '',
  city: '',
  fullName: '',
}

export const userProfile = new Profile<UserDto, User>(destinationInitialState)
.forMember('fullNamed', (source) => source.name + ' ' + source.surname)

// ERROR: Property 'fullNamed' does not exist on type 'User'
```

After creating the profile we can map the objects:

* There is no need to tell the auto mapper which interfaces will be used, it will automatically infer them from the 
  profile

```typescript
import { AutoMapper } from "@ts-lab/auto-mapper";
import { UserDto } from "./interfaces/userDto";
import { userProfile } from "./interfaces/userProfile";

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
  expectedResult = {
    id: '1',
    fullName: 'John Doe',
    city: 'New York',
    email: 'email'
  }
}

```
