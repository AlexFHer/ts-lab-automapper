import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ObjectValidatorDocsRoutingModule } from "./object-validator-docs-routing.module";
import { ObjectValidatorDocsComponent } from './object-validator-docs.component';


@NgModule({
  declarations: [
    ObjectValidatorDocsComponent
  ],
  imports: [
    CommonModule,
    ObjectValidatorDocsRoutingModule
  ]
})
export class ObjectValidatorDocsModule {
}
