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

  it('should correctly clone', () => {
    const mockData: UserFormOutput = {
      name: 'John',
      email: 'John@gmail.com',
      age: 15,
      hobbies: []
    }
    const normalValidator = new ObjectValidator<UserFormOutput>()
    .addValidationRule('name', value => value.includes('John'))
    .addValidationRule('email', value => value.length > 0);
    const clonedValidator = normalValidator.clone()
    .addValidationRule('age', value => value > 18);
    expect(normalValidator.validate(mockData)).toBeTrue();
    expect(clonedValidator.validate(mockData)).toBeFalse();
  });

  it('should remove a validation', () => {
    const mockData: UserFormOutput = {
      name: 'John',
      email: 'John@gmail.com',
      age: 15,
      hobbies: []
    }
    const failedValidator = new ObjectValidator<UserFormOutput>()
    .addValidationRule('name', value => value.includes('John'))
    .addValidationRule('age', value => value > 18);

    expect(failedValidator.validate(mockData)).toBeFalse();
    const successValidator = failedValidator.removeValidationRule('age');
    expect(successValidator.validate(mockData)).toBeTrue();
  });
});
