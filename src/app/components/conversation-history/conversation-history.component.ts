import { Component } from '@angular/core';
import { SendMessageRequest } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-conversation-history',
  templateUrl: './conversation-history.component.html',
  styleUrls: ['./conversation-history.component.css']
})
export class ConversationHistoryComponent {
  selectedUserId: any | null;
  receiverId: string = '';
  messageContent: string = '';
  receivedData: any = [];
  errorMessage = '';
  showOptionsIndex: number = -1;
  isUpdateGroup: boolean = false;
  userInfo: any;
  ascendingOrder: boolean = true;
  messageLimit: number = 20;


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
  }

  sendMessage() {
    const request: SendMessageRequest = {
      receiverId: this.selectedUserId,
      content: this.messageContent
    };
    this.userService.sendMessage(request).subscribe(
      (response) => {
        this.messageContent = '';
        this.isFetchHistory();
        this.toastr.success("message sent successfully");
      },
      (error) => {
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

  editMessage(message: any) {
    message.isEditing = true;
    message.originalContent = message.content;
    message.editedContent = message.originalContent;
    this.hideOptions();
  }

  saveEditedMessage(message: any) {
    this.userService.updateMessage(message.id, message.editedContent).subscribe(
      (response) => {  
        message.isEditing = false;
        message.content = message.editedContent;
        this.toastr.success(response.message);
      },
      (error) => {
        this.errorMessage = 'Something went wrong';
        this.toastr.error(error);
      }
    );
  }

  cancelEdit(message: any) {
    message.isEditing = false;
    message.editedContent = message.originalContent;
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