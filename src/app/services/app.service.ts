import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user)
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user)
  }
}