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
  ngOnInit(): void {
    console.log('ngOnInit');
    const token = localStorage.getItem('token');
    if (!token || !this.authService.isValidToken(token)) {
      // No hay un token válido en el localStorage, redirige a la página de inicio de sesión.
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

  get usuario() {
    return this.authService.usuario;
  }
  logout() {
    this.authService.logout();
    this.route.navigate(['/auth']);
  }

  toggleMenu() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  changeLanguage(language: string) {
    this.traslate.use(language);
    this.selectedLn = language;
  }
}
