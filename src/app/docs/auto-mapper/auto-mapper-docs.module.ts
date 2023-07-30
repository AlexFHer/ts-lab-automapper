import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoMapperDocsRoutingModule } from "./auto-mapper-docs-routing.module";
import { AutoMapperDocsComponent } from './auto-mapper-docs.component';



@NgModule({
  declarations: [
    AutoMapperDocsComponent
  ],
  imports: [
    CommonModule,
    AutoMapperDocsRoutingModule
  ]
})
export class AutoMapperDocsModule { }
