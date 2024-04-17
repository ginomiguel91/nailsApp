import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ProtectedRoutingModule } from '../protected/protected-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown.component';

@NgModule({
  declarations: [FooterComponent, NavbarComponent, LanguageDropdownComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FontAwesomeModule,
    TranslateModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    TranslateModule,
    LanguageDropdownComponent,
  ],
})
export class SharedModule {}
