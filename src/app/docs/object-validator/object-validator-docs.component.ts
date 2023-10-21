import { Component, OnInit } from '@angular/core';
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
    const formOutputValidator = new ObjectValidator<UserFormOutput>()
    .addValidationRule('name', value => value.includes('John'))
    .addValidationRule('hobbies', value => value.length > 0)
    .addValidationRule('age', value => value > 18)
    .addValidationRule('email', value => value.includes('@'))
    .addValidationRule('city', value => value.name.length > 0 && value.country.length > 0)
    console.log(formOutputValidator.validate(formOutputMock));
  }


}
