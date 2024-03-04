import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CatalogueComponent } from './pages/arrangement/components/catalogue/catalogue.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '',
            component: CatalogueComponent,
          },

          {
            path: 'arrangement',
            loadChildren: () =>
              import('./pages/arrangement/arrangement.module').then(
                (m) => m.ArrangementModule
              ),
          },
        ],
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
