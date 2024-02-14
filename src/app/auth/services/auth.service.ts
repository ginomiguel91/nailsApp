import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthResponse, JwtToken, User } from '../interfaces/auth.interface';
import { Subject, catchError, map, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _baseUrl = environment.apiUrl;
  _usuario!: User;
  // Definir un Subject para emitir eventos cuando se actualiza la información del usuario
  private usuarioActualizadoSubject = new Subject<User>();
  usuarioActualizado$ = this.usuarioActualizadoSubject.asObservable();
  constructor(private http: HttpClient) {}
  get usuario() {
    return { ...this._usuario };
  }
  login(username: string, password: string) {
    const url = `${this._baseUrl}/auth/login`;
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.token) {
          console.log('respuesta', resp);
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            username: this.DecodeToken(resp.token).sub!,
          };
          Cookie.set('user', JSON.stringify(this._usuario));
          // Emitir un evento cuando se actualiza la información del usuario
          this.usuarioActualizadoSubject.next(this._usuario);
        }
      }),
      map(() => of(true)),
      catchError(() => of(false))
    );
  }

  isValidToken(token: string): boolean {
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodificar token
      const expirationTimestamp = tokenData.exp * 1000; // Convertir segundos a milisegundos
      return expirationTimestamp > Date.now();
    } catch (error) {
      return false; // Manejo de errores, por ejemplo, token inválido
    }
  }
  DecodeToken(token: string): JwtToken {
    return jwtDecode<JwtToken>(token);
  }
  setAuthenticatedUser(user: User) {
    this._usuario = user;
  }

  logout() {
    localStorage.removeItem('token');
    Cookie.delete('user');
  }
}
