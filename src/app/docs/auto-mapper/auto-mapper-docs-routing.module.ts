import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutoMapperDocsComponent } from "./auto-mapper-docs.component";

const routes: Routes = [
  { path: '', component: AutoMapperDocsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoMapperDocsRoutingModule { }
