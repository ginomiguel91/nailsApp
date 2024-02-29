import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ProtectedRoutingModule } from '../protected/protected-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FooterComponent, NavbarComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FontAwesomeModule,
    TranslateModule,
  ],
  exports: [FooterComponent, NavbarComponent, TranslateModule],
})
export class SharedModule {}
