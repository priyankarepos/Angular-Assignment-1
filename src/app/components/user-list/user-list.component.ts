import { Component } from '@angular/core';
import { ChatUser, Message } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: ChatUser[] = [];
  selectedUserId: number | null = null;
  selectedUserMessageHistory: Message[] = [];
  // users: any[] = [
  //   {name: "priyanka", id:1, email:"priyanka@gmail.com"}
  // ];
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.chatService.getUsers()
      .subscribe(
        (users) => {
          this.users = users;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  onUserClick(user: any) {
    this.selectedUserId = user.id;
    this.fetchMessageHistory(user.id);
    console.log("user", user.id);
    this.chatService.SharedData.next(user);
  }

  fetchMessageHistory(user: any) {
    console.log("+++++++++++", user);
    
    this.chatService.getUserMessages(user)
      .subscribe(
        (messages) => {
          this.selectedUserMessageHistory = messages; // Store the message history in the new property
        },
        (error) => {
          console.error('Error fetching message history:', error);
        }
      );
  }

  getMsg() {
    // Check if a user is selected
    if (this.selectedUserId !== null) {
      // Implement any logic you want to perform when a user is clicked
      // For example, display the message history for the selected user
      console.log('User clicked');
      console.log('Selected user message history:', this.selectedUserMessageHistory);
    } else {
      console.log('No user selected.');
    }
  }
}
