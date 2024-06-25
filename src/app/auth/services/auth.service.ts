import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthResponse, JwtToken, User } from '../interfaces/auth.interface';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Cookie } from 'ng2-cookies/ng2-cookies';




export interface Credential {
email:string,
password:string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _baseUrl = environment.apiUrl;
  _usuario!: User;
  // Definir un Subject para emitir eventos cuando se actualiza la información del usuario
  private usuarioActualizadoSubject = new Subject<User>();
  usuarioActualizado$ = this.usuarioActualizadoSubject.asObservable();
  constructor(private http: HttpClient,

    
    ) {}



/**
 * The function returns a copy of the user object.
 * @returns A copy of the `_usuario` object is being returned using the spread operator `{
 * ...this._usuario }`.
 */
  get usuario() {
    return { ...this._usuario };
  }
/**
 * The `login` function in TypeScript sends a POST request to a login endpoint, processes the response,
 * and updates user information accordingly.
 * @param {string} username - The `login` function you provided is a method that takes a username and
 * password as parameters, sends a POST request to a login endpoint with the provided credentials, and
 * handles the response accordingly.
 * @param {string} password - The `login` function you provided takes two parameters: `username` and
 * `password`. The `password` parameter is a string that represents the user's password. When calling
 * the `login` function, you would pass the user's password as a string value.
 * @returns The `login` function is returning an Observable that makes a POST request to the specified
 * URL with the provided username and password in the request body. Upon receiving a response, it
 * checks if a token is present, stores the token in local storage, decodes the token to extract the
 * username, stores the user information in a cookie, and emits an event to notify subscribers that the
 * user information has been updated
 */
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

  /**
   * The function `isValidToken` checks if a given token is valid by decoding it, extracting the
   * expiration timestamp, and comparing it with the current time.
   * @param {string} token - The `token` parameter is a string that represents a JSON Web Token (JWT).
   * It is typically a string that consists of three parts separated by dots: the header, the payload,
   * and the signature. In the `isValidToken` function provided, the function attempts to decode the
   * token, extract the
   * @returns The function `isValidToken` returns a boolean value. It returns `true` if the token is
   * valid and has not expired, and `false` if there is an error parsing the token or if the token has
   * expired.
   */
  isValidToken(token: string): boolean {
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodificar token
      const expirationTimestamp = tokenData.exp * 1000; // Convertir segundos a milisegundos
      return expirationTimestamp > Date.now();
    } catch (error) {
      return false; // manage  errors, for example invalid token 
    }
  }
/**
 * The function `DecodeToken` decodes a JWT token using jwtDecode and returns the decoded token as a
 * JwtToken.
 * @param {string} token - The `token` parameter in the `DecodeToken` function is a string that
 * represents a JSON Web Token (JWT) that needs to be decoded to extract the information it contains.
 * @returns The function `DecodeToken` is returning a decoded JWT token of type `JwtToken`.
 */
  DecodeToken(token: string): JwtToken {
    return jwtDecode<JwtToken>(token);
  }
 /**
  * The function `setAuthenticatedUser` assigns a user object to a private variable `_usuario`.
  * @param {User} user - User object containing information about the authenticated user
  */
  setAuthenticatedUser(user: User) {
    this._usuario = user;
  }

/**
 * The `logout` function removes the 'token' item from localStorage and deletes the 'user' cookie.
 */
  logout() {
    localStorage.removeItem('token');
    Cookie.delete('user');
  }



 // Nuevo método para iniciar sesión con Google

  
}
