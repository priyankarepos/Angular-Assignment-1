import { Component, Input, OnChanges } from '@angular/core';
import { Message } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-conversation-history',
  templateUrl: './conversation-history.component.html',
  styleUrls: ['./conversation-history.component.css']
})
export class ConversationHistoryComponent {
  selectedUserId: any | null; // Use the non-null assertion operator !
  messageHistory: Message[] = [];
  // selectedUser: any | null = null;
  constructor(private userService: ChatService, private route: ActivatedRoute,) {
   }

  ngOnInit() {
    this.userService.getSharedData().subscribe((data) => {
      this.selectedUserId = data.id;
      console.log("dataaa", data.id);
      console.log("this.selectedUserId", this.selectedUserId);
      
    });
    console.log("=============",  this.selectedUserId);
    this.route.paramMap.subscribe(params => {
      this.selectedUserId = Number(params.get('userId')); // Read the userId from the route parameter
      this.fetchMessageHistory();
    });
  }

  // ngOnChanges() {
  //   if (this.selectedUserId !== null) {
  //     this.fetchMessageHistory(this.selectedUserId);
  //   }
  // }

  fetchMessageHistory() {
    if (this.selectedUserId !== null) {
      this.userService.getUserMessages(this.selectedUserId)
        .subscribe(
          (messages) => {
            this.messageHistory = messages;
          },
          (error) => {
            console.error('Error fetching message history:', error);
          }
        );
    }
  }
}
