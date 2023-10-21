import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ObjectValidatorDocsComponent } from "./object-validator-docs.component";

const routes: Routes = [
  {path: '', component: ObjectValidatorDocsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectValidatorDocsRoutingModule {
}
