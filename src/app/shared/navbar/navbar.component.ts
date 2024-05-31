import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import {
  faUser,
  faSignOut,
  faLanguage,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private route: Router,
    private traslate: TranslateService
  ) {}
  faSignOut = faSignOut;
  faUser = faUser;
  faLanguage = faLanguage;
  faCheck = faCheck;
  selectedLn: string = '';
  @ViewChild('navBurger') navBurger!: ElementRef;
  @ViewChild('navMenu') navMenu!: ElementRef;
 /**
  * The ngOnInit function checks for a valid token in localStorage, decodes it, and sets the user
  * information based on the decoded token or a cookie.
  */
  ngOnInit(): void {
    console.log('ngOnInit');
    const token = localStorage.getItem('token');
    if (!token || !this.authService.isValidToken(token)) {
      // If not valid token in localStorage, redirect to login page.
      this.route.navigate(['/login']);
    }
    const decodedToken = this.authService.DecodeToken(token!);

    console.log('Token decodificado:', decodedToken);
    let user: User;
    if (Cookie.check('user')) {
      console.log('COOKIE:', Cookie.get('user'));
      user = JSON.parse(Cookie.get('user'));
    } else {
      user = {
        username: decodedToken.sub!,
      };
    }
    this.authService._usuario = user;
    console.log('USUARIO:', this.authService._usuario);
  }

/**
 * The function returns the user from the authService.
 * @returns The `usuario` property from the `authService` is being returned.
 */
  get usuario() {
    return this.authService.usuario;
  }
/**
 * The `logout` function logs the user out and navigates to the authentication page.
 */
  logout() {
    this.authService.logout();
    this.route.navigate(['/auth']);
  }

/**
 * The toggleMenu function toggles the 'is-active' class on the navBurger and navMenu elements.
 */
  toggleMenu() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
/**
 * The function `changeLanguage` changes the language used for translation and updates the selected
 * language.
 * @param {string} language - The `changeLanguage` function takes a `language` parameter, which is a
 * string representing the language code or identifier to switch the translation to. This parameter is
 * used to set the language for translation and update the `selectedLn` property to reflect the
 * currently selected language.
 */

  changeLanguage(language: string) {
    this.traslate.use(language);
    this.selectedLn = language;
  }
}
