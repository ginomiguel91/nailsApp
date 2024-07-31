import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CatalogueComponent } from './pages/arrangement/components/catalogue/catalogue.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ContactComponent } from './pages/contact/contact.component';

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
            path: 'profile',
            component: ProfileComponent,
          },
          {
            path: 'about',
            component: AboutComponent,
          },

          {
            path: 'customer',
            component: CustomerComponent,
          },

          {
            path: 'contact',
            component: ContactComponent,
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
