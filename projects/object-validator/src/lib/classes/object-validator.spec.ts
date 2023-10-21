import { ObjectValidator } from "./object-validator";

interface UserFormOutput {
  name: string;
  email: string;
  hobbies: string[];
  age: number;
}

describe('ObjectValidator', () => {
  it('should create an instance', () => {
    expect(new ObjectValidator()).toBeTruthy();
  });

  it('should validate to true correctly', () => {
    const mockData: UserFormOutput = {
      name: 'John',
      email: 'email@domain.com',
      age: 20,
      hobbies: ['hobby1']
    }
    const validator = new ObjectValidator<UserFormOutput>()
    .addValidationRule('name', value => value.includes('John'))
    .addValidationRule('hobbies', value => value.length > 0)
    .addValidationRule('age', value => value > 18)
    .addValidationRule('email', value => value.includes('@'))
    expect(validator.validate(mockData)).toBeTrue();
  });

  it('should validate to false correctly', () => {
    const mockData: UserFormOutput = {
      name: 'John',
      email: 'email@domain.com',
      age: 15,
      hobbies: ['hobby1']
    }
    const validator = new ObjectValidator<UserFormOutput>()
    .addValidationRule('name', value => value.includes('John'))
    .addValidationRule('hobbies', value => value.length > 0)
    .addValidationRule('age', value => value > 18)
    .addValidationRule('email', value => value.includes('@'))
    expect(validator.validate(mockData)).toBeFalse();
  });
});
