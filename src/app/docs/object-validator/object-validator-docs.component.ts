import { Component, OnInit } from '@angular/core';
import { delay, lastValueFrom, map, of } from "rxjs";
import { ObjectValidator } from "../../../../projects/object-validator/src/lib/classes/object-validator";
import { UserFormOutput } from "./interfaces/form-output";
import { formOutputMock } from "./mocks/form-output.mock";

@Component({
  selector: 'app-object-validator',
  templateUrl: './object-validator-docs.component.html',
  styleUrls: ['./object-validator-docs.component.scss']
})
export class ObjectValidatorDocsComponent implements OnInit {

  async ngOnInit(): Promise<void> {
    const objectValidator = new ObjectValidator<UserFormOutput>();
    // @ts-ignore
    const subjectUserHasMoreThan20Years = of(formOutputMock)
    .pipe(
      delay(5000),
      map((user: UserFormOutput) => {
        console.log("20 validated");
        return user.age > 20
      })
    );

    const subjectUserHasMoreThan70Years = of(formOutputMock)
    .pipe(
      delay(5000),
      map((user: UserFormOutput) => {
        console.log("70 validated");
        return user.age > 70
      }),
    );

    objectValidator
    .addValidationRule('age', (age: number) => age > 20)
    .addAsyncValidationRule('age', () => lastValueFrom(subjectUserHasMoreThan20Years))
    .addAsyncValidationRule('age', () => lastValueFrom(subjectUserHasMoreThan70Years))

    const resultValidations = await objectValidator.validateAsync(formOutputMock);
    console.log(resultValidations);
  }


}
