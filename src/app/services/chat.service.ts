import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ChatUser, Message } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = "http://localhost:3000"
  SharedData = new Subject<any>();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ChatUser[]> {
    return this.http.get<ChatUser[]>(`${this.apiUrl}/users`);
  }

  getUserMessages(userId: any): Observable<Message[]> {
    console.log("userIduserId", userId);
    
    return this.http.get<Message[]>(`${this.apiUrl}/users/${userId}/messages`);
  }

  setSharedData(data: any) {
    this.SharedData.next(data);
  }

  getSharedData() {
    return this.SharedData.asObservable();
  }
}