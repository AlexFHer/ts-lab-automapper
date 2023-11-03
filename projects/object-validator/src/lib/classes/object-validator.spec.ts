import { delay, lastValueFrom, map, of } from "rxjs";
import { ObjectValidator } from "./object-validator";

interface UserFormOutput {
  name: string;
  email: string;
  hobbies: string[];
  age: number;
}

describe('ObjectValidator', () => {

  const mockData: UserFormOutput = {
    name: 'John',
    email: 'email@gmail.com',
    age: 20,
    hobbies: ['hobby1']
  }

  it('should create an instance', () => {
    expect(new ObjectValidator()).toBeTruthy();
  });

  describe('Synchronous validations', () => {
    it('should validate to true correctly', () => {
      const validator = new ObjectValidator<UserFormOutput>()
      .addValidationRule('name', value => value.includes('John'))
      .addValidationRule('hobbies', value => value.length > 0)
      .addValidationRule('age', value => value > 18)
      .addValidationRule('email', value => value.includes('@'))
      expect(validator.validate(mockData)).toBeTrue();
      validator.removeValidationRule('age');
      validator.addValidationRule('age', value => value < 18);
      expect(validator.validate(mockData)).toBeFalse();
    });
  })

  describe('Asynchronous validations', () => {
    it('should validate data', async () => {
      const asynchronousValidationNonValid = of(mockData)
      .pipe(
        map(data => data.age > 20),
        delay(100)
      );
      const asynchronousValidationValid = of(mockData)
      .pipe(
        map(data => data.age <= 20),
        delay(100)
      );
      const validator = new ObjectValidator<UserFormOutput>()
      .addValidationRule('name', value => value.includes('John'))
      .addValidationRule('hobbies', value => value.length > 0)
      .addAsyncValidationRule('age', () => lastValueFrom(asynchronousValidationNonValid))

      expect(await validator.validateAsync(mockData)).toBeFalse();

      validator.removeValidationRule('age');
      expect(await validator.validateAsync(mockData)).toBeTrue();

      validator.addAsyncValidationRule('age', () => lastValueFrom(asynchronousValidationValid));
      expect(await validator.validateAsync(mockData)).toBeTrue();
    });
    it('should not validate asynchronous validations if synchronous validations do not pass', async () => {
      const validator = new ObjectValidator<UserFormOutput>()
      .addValidationRule('name', value => value.includes('fakeName'))
      .addValidationRule('hobbies', value => value.length > 0)
      .addAsyncValidationRule('age', () => lastValueFrom(of(true).pipe(delay(100))));
      expect(await validator.validateAsync(mockData)).toBeFalse();
    });
  });

  describe('Clone', () => {
    it('should correctly clone', () => {
      const asyncronousValidation = of(mockData)
      .pipe(
        map(data => data.hobbies.length >= 0),
        delay(10)
      )
      const normalValidator = new ObjectValidator<UserFormOutput>()
      .addValidationRule('name', value => value.includes('John'))
      .addValidationRule('email', value => value.length > 0)
      .addAsyncValidationRule('age', () => lastValueFrom(asyncronousValidation));
      const clonedValidator = normalValidator.clone()
      .addValidationRule('age', value => value > 20);
      expect(normalValidator.validate(mockData)).toBeTrue();
      expect(clonedValidator.validate(mockData)).toBeFalse();
    });
  });

  describe('Validation removals', () => {
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
});
