import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/models/user.model';

@Component({
  selector: 'app-conversation-history',
  templateUrl: './conversation-history.component.html',
  styleUrls: ['./conversation-history.component.css']
})
export class ConversationHistoryComponent implements OnInit {
  selectedUserId: any | null;
  messageContent: string = '';
  receivedData: any = [];
  errorMessage = '';
  showOptionsIndex: number = -1;
  userInfo: any;
  ascendingOrder: boolean = true;
  messageLimit: number = 20;
  editedMessageContent: string = ''; 

  constructor(
    private userService: ChatService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userService.MsgHistoryData.subscribe((data) => {
      this.receivedData = Object.values(data)[0];
    });

    this.userService.UserName.subscribe((user) => {
      this.userInfo = user.name;
    });

    this.userService.getSharedData().subscribe((data) => {
      this.selectedUserId = data.id;
    });

    this.receivedData.map((message: Message) => {
      message.isEditing = false;
    });
  }

  sendMessage() {
    const request = {
      receiverId: this.selectedUserId,
      content: this.messageContent
    };

    this.userService.sendMessage(request).subscribe(
      (response) => {
        this.messageContent = '';
        this.isFetchHistory();
      },
      (error) => {
        console.error('Error sending message:', error);
        this.toastr.error(error);
      }
    );
  }

  onRightClick(event: MouseEvent, index: number) {
    event.preventDefault();
    this.showOptionsIndex = index;
  }

  hideOptions() {
    this.showOptionsIndex = -1;
  }

  editMessage(message: Message) {
    this.editedMessageContent = message.content;
    message.isEditing = true;
    this.hideOptions();
  }

  saveEditedMessage(message: Message) {
    message.content = this.editedMessageContent;    

    this.userService.updateMessage(message.id, message.content).subscribe(
      (response) => {
        message.isEditing = false;
        this.editedMessageContent = '';
        this.toastr.success('Message updated successfully');
      },
      (error) => {
        this.errorMessage = 'Something went wrong';
        this.toastr.error(error);
      }
    );
  }

  cancelEdit(message: Message) {
    message.isEditing = false;
    this.editedMessageContent = '';
  }

  deleteMessage(messageId: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this message?');
    if (confirmDelete) {
      this.userService.deleteMessage(messageId).subscribe(
        (response) => {
          this.toastr.success('Message deleted successfully');
          this.isFetchHistory();
        },
        (error) => {
          console.error('Error deleting message:', error);
          this.toastr.error(error);
        }
      );
    }

    this.hideOptions();
  }

  isFetchHistory() {
        const request = {
          userId: this.selectedUserId,
          sort: this.ascendingOrder ? 'ASC' : 'DESC',
          count: this.messageLimit
        };
      
        this.userService.getMessageHistory(request).subscribe(
          (res) => {
            this.receivedData = Object.values(res)[0];
          },
          (error) => {
            this.toastr.error(error);
          }
        );
      }
    toggleSortOrder() {
    this.ascendingOrder = !this.ascendingOrder;
    this.isFetchHistory();
    
  }
  loadMoreMessages() {
    this.messageLimit += 20;
    this.isFetchHistory();
  }
}
