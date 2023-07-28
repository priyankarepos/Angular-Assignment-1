import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {
 apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  // saveToken(token: string): void {
  //   localStorage.setItem('jwtToken', token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('jwtToken');
  // }

  // removeToken(): void {
  //   localStorage.removeItem('jwtToken');
  // }

  // getAuthorizationHeader(): HttpHeaders {
  //   const token = this.getToken();
  //   return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // }
}