import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatUser, MessageHistory } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userData: ChatUser[] = [];
  selectedUserId: string | null = null;
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
    this.onUserClick(this.userData[0].id);
  }

  getUsers() {
    this.chatService.getUsers()
      .subscribe(
        (users) => {
          this.userData = Object.values(users)[0];
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  onUserClick(user: any) {
    this.selectedUserId = user.id;
    localStorage.setItem('receiverId', user.id);
    this.chatService.SharedData.next(user);
    if (this.selectedUserId !== null) {
      const request = {
        userId: this.selectedUserId,
        // before: '2023-07-27T15:03:15.504Z',
        count: '20',
        sort: 'ASC'
      };
      this.chatService.getMessageHistory(request)
        .subscribe(
          (res) => {
            this.chatService.MsgHistoryData.next(res);
            this.router.navigate([`chat/user/${this.selectedUserId}`])
            this.chatService.UserName.next(user);
          },
          (error) => {
            console.error('Error fetching message history:', error);
          }
        );
    }

  }
}
