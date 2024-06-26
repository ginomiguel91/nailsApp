import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'nailsApp';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en'); //  Default language (English)
    translate.use('en'); 
  }
}
