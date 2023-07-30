import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AutoMapperDocsComponent } from "./docs/auto-mapper/auto-mapper-docs.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'auto-mapper-test', pathMatch: 'full'},
      { path: 'auto-mapper-test', loadChildren: () => import('./docs/auto-mapper/auto-mapper-docs.module').then(m => m.AutoMapperDocsModule) }
    ]
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
