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
  // messageHistory: any ;
  // users: any[] = [
  //   {name: "priyanka", id:1, email:"priyanka@gmail.com"}
  // ];
  constructor(private chatService: ChatService, private router:Router) { }

  ngOnInit() {
    this.getUsers();
    this.onUserClick(this.userData[0].id);
    console.log("messageHistory", this.userData);

  }

  getUsers() {
    this.chatService.getUsers()
      .subscribe(
        (users) => {
          this.userData = Object.values(users)[0];
          console.log("this.userData", this.userData[0].id);

        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  onUserClick(user: any) {
    this.selectedUserId = user.id;
    this.chatService.SharedData.next(user);
    if (this.selectedUserId !== null) {
      const request = {
        userId: this.selectedUserId,
        // before: '2023-07-27T15:03:15.504Z',
        // count: '',
        sort: 'ASC'
      };
      this.chatService.getMessageHistory(request)
        .subscribe(
          (res) => {
            console.log("this.messageHistory", res, this.selectedUserId);
            this.chatService.MsgHistoryData.next(res);
            this.router.navigate([`chat/user/${this.selectedUserId}`])
            console.log(this.selectedUserId)
          },
          (error) => {
            console.error('Error fetching message history:', error);
          }
        );
    }

  }
}
