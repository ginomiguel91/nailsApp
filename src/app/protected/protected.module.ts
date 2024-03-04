import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ArrangementModule } from './pages/arrangement/arrangement.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ArrangementModule,
    FontAwesomeModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [TranslateModule],
})
export class ProtectedModule {}
