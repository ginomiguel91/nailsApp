import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}
  faSignOut = faSignOut;
  faUser = faUser;
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
}
