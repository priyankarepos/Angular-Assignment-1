import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ChatUser, SendMessageRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = "http://localhost:3000/api"
  SharedData = new Subject<any>();

  constructor(private http: HttpClient) { }

  getUsers() {
    let headers = new HttpHeaders().
      set("Authorization", `${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/users`, { headers });
  }

  sendMessage(request: SendMessageRequest): Observable<any> {
    let headers = new HttpHeaders().
      set("Authorization", `${localStorage.getItem('token')}`);
    return this.http.post<any>(`${this.apiUrl}/message`, request, { headers });
  }

  getMessageHistory(request: any) {
    let headers = new HttpHeaders().
      set("Authorization", `${localStorage.getItem('token')}`);
    return this.http.post<any>(`${this.apiUrl}/messages`, request, { headers });
  }

  setSharedData(data: any) {
    this.SharedData.next(data);
  }
  getSharedData() {
    return this.SharedData.asObservable();
  }
}