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
  MsgHistoryData = new Subject<any>();

  constructor(private http: HttpClient) { }

  getUsers() {
    let headers = new HttpHeaders().
      set("Authorization", `${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/users`, { headers });
  }

  sendMessage(request: SendMessageRequest): Observable<any> {
    console.log("request", request);
    
    let headers = new HttpHeaders().
      set("Authorization", `${localStorage.getItem('token')}`);
    return this.http.post<any>(`${this.apiUrl}/message`, request, { headers });
  }

  getMessageHistory(request: any) {
    let headers = new HttpHeaders().
      set("Authorization", `${localStorage.getItem('token')}`);
    return this.http.post<any>(`${this.apiUrl}/messages`, request, { headers });
  }

  updateMessage(messageId: any, content: any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `${localStorage.getItem('token')}`);
    let request = { content: content };
    return this.http.put<any>(`${this.apiUrl}/message/${messageId}`, request, { headers });
  }

  deleteMessage(messageId: string) {
    let headers = new HttpHeaders().
      set("Authorization", `${localStorage.getItem('token')}`);
    return this.http.delete<any>(`${this.apiUrl}/message/${messageId}`, { headers })
  }

  setSharedData(data: any) {
    this.SharedData.next(data);
  }

  getSharedData() {
    return this.SharedData.asObservable();
  }
}