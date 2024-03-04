import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArrangementRoutingModule } from './arrangement-routing.module';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ListComponent } from './pages/list/list.component';
import { ShowComponent } from './pages/show/show.component';
import { NewComponent } from './pages/new/new.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CatalogueComponent,
    ListComponent,
    ShowComponent,
    NewComponent,
  ],
  imports: [CommonModule, ArrangementRoutingModule, TranslateModule],
  exports: [CatalogueComponent, TranslateModule],
})
export class ArrangementModule {}
