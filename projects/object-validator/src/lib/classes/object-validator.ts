export class ObjectValidator<T> {
  private readonly validations: Record<keyof T, ((value: T[keyof T]) => boolean)[]> =
    {} as Record<keyof T, ((value: T[keyof T]) => boolean)[]>;

  public addValidationRule<P extends keyof T>(_property: P, _validation: (value: T[P]) => boolean): this {
    if (!this.validations[_property]) {
      this.validations[_property] = [];
    }
    this.validations[_property].push(_validation as (value: T[keyof T]) => boolean);
    return this;
  }

  public removeValidationRule<P extends keyof T>(_property: P): this {
    delete this.validations[_property];
    return this;
  }

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
    return clone;
  }
}
