import { Component, OnInit } from '@angular/core';
import { delay, map, of } from "rxjs";
import { ObjectValidator } from "../../../../projects/object-validator/src/lib/classes/object-validator";
import { UserFormOutput } from "./interfaces/form-output";
import { formOutputMock } from "./mocks/form-output.mock";

@Component({
  selector: 'app-object-validator',
  templateUrl: './object-validator-docs.component.html',
  styleUrls: ['./object-validator-docs.component.scss']
})
export class ObjectValidatorDocsComponent implements OnInit {

  ngOnInit(): void {
    const objectValidator = new ObjectValidator<UserFormOutput>();
    // @ts-ignore
    const subjectUserHasMoreThan20Years: Promise<boolean> = of(formOutputMock)
    .pipe(
      map((user: UserFormOutput) => user.age < 20),
      delay(3000)
    ).toPromise();

    objectValidator
    .addValidationRule('age', (age: number) => age > 20)
    .addAsyncValidationRule('age', () => subjectUserHasMoreThan20Years);

    objectValidator.validateAsync(formOutputMock)
    .then(result => {
      console.log('result', result);
    })
  }


}
