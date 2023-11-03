export class ObjectValidator<T> {
  private readonly validations: Record<keyof T, ((value: T[keyof T]) => boolean)[]> =
    {} as Record<keyof T, ((value: T[keyof T]) => boolean)[]>;

  private readonly asyncValidations: Record<keyof T, ((value: T[keyof T]) => Promise<boolean>)[]> =
    {} as Record<keyof T, ((value: T[keyof T]) => Promise<boolean>)[]>;


  /**
   * Add a validation rule to a property
   * example: addValidationRule('name', (name: string) => name.length > 3)
   * @param _property
   * @param _validation
   */
  public addValidationRule<P extends keyof T>(_property: P, _validation: (value: T[P]) => boolean): this {
    if (!this.validations[_property]) {
      this.validations[_property] = [];
    }
    this.validations[_property].push(_validation as (value: T[keyof T]) => boolean);
    return this;
  }

  /**
   * Add an async validation rule to a property
   * example: addAsyncValidationRule('name', (name: string) => promise<boolean>)
   * @param _property
   * @param _validation
   */

  public addAsyncValidationRule<P extends keyof T>(_property: P, _validation: (value: T[P]) => Promise<boolean>): this {
    if (!this.asyncValidations[_property]) {
      this.asyncValidations[_property] = [];
    }
    this.asyncValidations[_property].push(_validation as (value: T[keyof T]) => Promise<boolean>);
    return this;
  }

  /**
   * Remove all validations from a property
   * example: removeValidationRule('name')
   * @param _property
   */

  public removeValidationRule<P extends keyof T>(_property: P): this {
    delete this.asyncValidations[_property];
    delete this.validations[_property];
    return this;
  }

  /**
   * Validate all non async validations
   * @param data
   */

  public validate(data: T): boolean {
    let isValid = true;
    for (const property in this.validations) {
      if (this.validations.hasOwnProperty(property)) {
        const validations = this.validations[property];
        for (const validation of validations) {
          if (!validation(data[property])) {
            isValid = false;
            break;
          }
        }
      }
    }
    return isValid;
  }

  /**
   * Validate all async validations including non async validations
   * Note: It will validate firstly all non async validations and then all async validations, in case non async validations fail, it will not validate async validations
   * @param data
   */

  public async validateAsync(data: T): Promise<boolean> {
    let isValid = true;
    const synchronousValidations = this.validate(data);
    if (!synchronousValidations) {
      return false;
    }

    for (const property in this.asyncValidations) {
      if (this.asyncValidations.hasOwnProperty(property)) {
        const validations = this.asyncValidations[property];
        for (const validation of validations) {
          if (!await validation(data[property])) {
            isValid = false;
            break;
          }
        }
      }
    }
    return isValid;
  }

  /**
   * Clone the object validator
   */

  public clone(): ObjectValidator<T> {
    const clone = new ObjectValidator<T>();
    for (const property in this.validations) {
      if (this.validations.hasOwnProperty(property)) {
        const validations = this.validations[property];
        for (const validation of validations) {
          clone.addValidationRule(property, validation);
        }
      }
    }
    for (const property in this.asyncValidations) {
      if (this.asyncValidations.hasOwnProperty(property)) {
        const validations = this.asyncValidations[property];
        for (const validation of validations) {
          clone.addAsyncValidationRule(property, validation);
        }
      }
    }
    return clone;
  }
}
