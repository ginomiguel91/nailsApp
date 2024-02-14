import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArrangementRoutingModule } from './arrangement-routing.module';
import { CatalogueComponent } from './components/catalogue/catalogue.component';

@NgModule({
  declarations: [CatalogueComponent],
  imports: [CommonModule, ArrangementRoutingModule],
  exports: [CatalogueComponent],
})
export class ArrangementModule {}
