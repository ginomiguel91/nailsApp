import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Arrangement } from '../interfaces/arrangement.interface';

@Injectable({
  providedIn: 'root',
})
export class ArrangementService {
  _baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getArrangements(): Observable<Arrangement[]> {
    const url = `${this._baseUrl}/arrangements`;

    return this.http.get<Arrangement[]>(url);
  }
}
