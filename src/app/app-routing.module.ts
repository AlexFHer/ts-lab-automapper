import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {path: '', redirectTo: 'object-validator-test', pathMatch: 'full'},
      {
        path: 'auto-mapper-test',
        loadChildren: () => import('./docs/auto-mapper/auto-mapper-docs.module').then(m => m.AutoMapperDocsModule)
      },
      {
        path: 'object-validator-test',
        loadChildren: () => import('./docs/object-validator/object-validator-docs.module').then(m => m.ObjectValidatorDocsModule)
      }
    ]
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
