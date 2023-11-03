# Object validator for typescript

A very lightweight library to create reusable configurations to validate objects in typescript.

## Installation

```bash
npm install @ts-lab/object-validator
```

## Usage

Given this interface:

```typescript
export interface UserFormOutput {
  name: string;
  age: number;
  hobbies?: string[];
}
```

With this data:

```typescript
const formOutputMock: UserFormOutput = {
  name: 'John',
  age: 20,
}
const formOutputMock2: UserFormOutput = {
  name: 'John',
  age: 70,
  hobbies: ['football', 'basketball'],
}
```

We firstly create 'ObjectValidator' instance specifing the **type**.

```typescript

const formOutputValidator = new ObjectValidator<UserFormOutput>()

```

## Creating synchronous validations

Then we can add validations for each property of the object.

```typescript

import { ObjectValidator } from '@ts-lab/object-validator';

const formOutputValidator = new ObjectValidator<UserFormOutput>()
.addValidationRule('name', value => value.includes('John'))
.addValidationRule('age', value => value > 18)
.addValidationRule('age', value => value < 65)

// NOTE -----------------
// if the property does not exist on the object, an error will be thrown when compiling
.addValidationRule('fakeName', value => value.includes('John')) // Error: Property fakeName does not exist on object
// if the expected type (string) does not match the type of the property (number), an error will be thrown when compiling
.addValidationRule('age', value => value.includes('John')) // Error: Property age is not of type string
}
```

Then the data can be validated with that configuration.

```typescript
  const formOutputValidator = new ObjectValidator<UserFormOutput>()
.addValidationRule('name', value => value.includes('John'))
.addValidationRule('age', value => value > 18)
.addValidationRule('age', value => value < 65)

formInputValidator.validate(formOutputMock); // true
formInputValidator.validate(formOutputMock2); // false
```

## Creating asynchronous validations

The library also supports asynchronous validations with **promises**.

```typescript

const asyncCall = of(mockData)
.pipe(
  map(data => data.age > 18),
  delay(1000)
)

const formOutputValidator = new ObjectValidator<UserFormOutput>()
.addValidationRule('name', value => value.includes('John'))
.addValidationRule('age', value => value > 18)
.addValidationRule('age', value => value < 65)
.addAsyncValidationRule('hobbies', value => lastValueFrom(asyncCall))
```

In order to validate asyncronous validations, the **validateAsync** method must be used which return a promise.

```typescript
  isValid = await formInputValidator.validateAsync(formOutputMock); // true
```

## Validations removal

A validation for a property can also be removed.

```typescript
  const formOutputValidator = new ObjectValidator<UserFormOutput>()
.addValidationRule('name', value => value.includes('John'))
.addValidationRule('age', value => value > 18)

formInputValidator.removeValidationRule('name');
```

## Configuration cloning

In order to create more than 1 validation configurations with small adjustments there is a method to clone the actual configuration.

```typescript
  const validatorForLessAge = new ObjectValidator<UserFormOutput>()
.addValidationRule('name', value => value.includes('John'))
.addValidationRule('age', value => value > 18)

const validatorForMoreAge = validatorForLessAge.clone()
.addValidationRule('age', value => value < 65)
```

The "validatorForMoreAge" configuration will have the same rules as "validatorForLessAge" plus the new rule for the "age" property.
