import { Component, Input, OnChanges } from '@angular/core';
import { SendMessageRequest } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-conversation-history',
  templateUrl: './conversation-history.component.html',
  styleUrls: ['./conversation-history.component.css']
})
export class ConversationHistoryComponent {
  selectedUserId: any | null; // Use the non-null assertion operator !
  messageHistory: any;
  receiverId: string = '';
  messageContent: string = '';
  constructor(private userService: ChatService, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.userService.getSharedData().subscribe((data) => {
      this.selectedUserId = data.id;
    });
    this.route.paramMap.subscribe(params => {
      this.selectedUserId = Number(params.get('userId'));
      // this.fetchMessageHistory();
    });
  }

  sendMessage() {
    const request: SendMessageRequest = {
      receiverId: this.selectedUserId,
      content: this.messageContent
    };
    
    

    this.userService.sendMessage(request).subscribe(
      (response) => {
        console.log('Message sent:', response);
        this
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  // fetchMessageHistory() {
  //   if (this.selectedUserId !== null) {
  //     this.userService.getUserMessages(this.selectedUserId)
  //       .subscribe(
  //         (messages) => {
  //           this.messageHistory = messages;
  //           console.log("this.messageHistory", this.messageHistory);

  //         },
  //         (error) => {
  //           console.error('Error fetching message history:', error);
  //         }
  //       );
  //   }
  // }
}
