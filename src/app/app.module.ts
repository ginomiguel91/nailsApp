import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.development';

/* configurar el cargador para admmitir varios idiomas */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const firebaseConfig = {
  apiKey: "AIzaSyD6AIFZWIGUTUkxEzuHHFEF5QUM7pt7GtQ",
  authDomain: "nails-13c9a.firebaseapp.com",
  projectId: "nails-13c9a",
  storageBucket: "nails-13c9a.appspot.com",
  messagingSenderId: "742962383987",
  appId: "1:742962383987:web:7ad1fe3c901cdda4146e06",
  measurementId: "G-1ZQ1MJMMQ8"
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,

    /* agregar esto */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
