import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ArrangementModule } from '../arrangement/arrangement.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ArrangementModule,
    FontAwesomeModule,
  ],
})
export class ProtectedModule {}
