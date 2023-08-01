// import { Component, Input, OnDestroy  } from '@angular/core';
// import { SendMessageRequest } from 'src/app/models/user.model';
// import { ChatService } from 'src/app/services/chat.service';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-conversation-history',
//   templateUrl: './conversation-history.component.html',
//   styleUrls: ['./conversation-history.component.css']
// })
// export class ConversationHistoryComponent {
//   clickOutsideSubscription:any
//   selectedUserId: any | null;
//   receiverId: string = '';
//   messageContent: string = '';
//   receivedData: any;
//   errorMessage = '';
//   showOptionsIndex: number = -1;
//   isUpdateGroup: boolean = false;
//   constructor(private userService: ChatService, private route: ActivatedRoute,private router: Router, private toastr: ToastrService) {
//     this.userService.MsgHistoryData.subscribe((data) => {
//       this.receivedData = Object.values(data)[0];
//       console.log("heyy msg", this.receivedData);
//     });

//     this.clickOutsideSubscription = this.router.events.subscribe(() => {
//       this.hideOptions();
//     });
//   }

//   ngOnInit() {
//     this.userService.getSharedData().subscribe((data) => {
//       this.selectedUserId = data.id;
//       console.log("selectedUserId", this.selectedUserId);
      
//     });
//     this.route.paramMap.subscribe(params => {
//       this.selectedUserId = Number(params.get('userId'));
//     });

//     this.receivedData.forEach((message:any) => {
//       if (typeof message === 'object') {
//         message.isEditing = false;
//         message.editedContent = message.content;
//       }
//     });
//   }

//   sendMessage() {
//     const request: SendMessageRequest = {
//       receiverId: this.selectedUserId,
//       content: this.messageContent
//     };
    
//     this.userService.sendMessage(request).subscribe(
//       (response) => {
//         console.log('Message sent:', response);
//         this.messageContent = '';
//       },
//       (error) => {
//         console.error('Error sending message:', error);
//       }
//     );
//   }

//   onRightClick(event: MouseEvent, index: number) {
//     event.preventDefault();
//     this.showOptionsIndex = index;
//   }

//   hideOptions() {
//     this.showOptionsIndex = -1;
//   }

//   editMessage(message: any) {
//     message.isEditing = true;
//     message.originalContent = message.content;
//     this.hideOptions()
//   }

//   saveEditedMessage(message: any) { 
//     console.log("message", message);
    
//     this.userService.updateMessage(message.id, message.editedContent).subscribe(
//       (response) => {
//         console.log('Message updated successfully:', response);
//         message.isEditing = false;
//         const updatedMessage = this.receivedData.find((msg: any) => msg.messageId === message.messageId);
//         if (updatedMessage) {
//           updatedMessage.content = message.editedContent;
//         }
//       },
//       (error) => {
//         console.error('Error updating message:', error);
//         this.errorMessage = 'Invalid credentials. Please try again.';
//       }
//     );
//   }

//   cancelEdit(message: any) {
//     message.isEditing = false;
//     message.editedContent = message.originalContent;
//   }


//   deleteMessage(messageId: string) {
//     this.userService.deleteMessage(messageId).subscribe(
//       (response) => {
//         console.log('Message deleted successfully:', response);
//         this.toastr.success('Message deleted successfully');
//         this.isUpdateGroup = true;
//         this.resetGroup()
//       },
//       (error) => {
//         console.error('Error deleting message:', error);
//       }
//     );
//     this.hideOptions()
//   }

//   ngOnDestroy() {
//     this.clickOutsideSubscription.unsubscribe();
//   }

//   resetGroup() {
//     this.isUpdateGroup = false;
//   }
// }


import { Component, OnDestroy } from '@angular/core';
import { SendMessageRequest } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation-history',
  templateUrl: './conversation-history.component.html',
  styleUrls: ['./conversation-history.component.css']
})
export class ConversationHistoryComponent implements OnDestroy {
  clickOutsideSubscription: Subscription;
  selectedUserId: any | null;
  receiverId: string = '';
  messageContent: string = '';
  receivedData: any = [];
  errorMessage = '';
  showOptionsIndex: number = -1;
  isUpdateGroup: boolean = false;

  constructor(
    private userService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userService.MsgHistoryData.subscribe((data) => {
      this.receivedData = Object.values(data)[0];
    });

    this.clickOutsideSubscription = this.router.events.subscribe(() => {
      this.hideOptions();
    });
  }

  ngOnInit() {
    this.userService.getSharedData().subscribe((data) => {
      this.selectedUserId = data.id;
    });
    this.route.paramMap.subscribe(params => {
      this.selectedUserId = Number(params.get('userId'));
    });

    this.receivedData.forEach((message: any) => {
      if (typeof message === 'object') {
        message.isEditing = false;
        message.editedContent = message.content;
      }
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
        this.messageContent = '';
      },
      (error) => {
        console.error('Error sending message:', error);
        this.toastr.error(error.message);
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
    this.hideOptions();
  }

  saveEditedMessage(message: any) { 
    console.log("message", message);
    
    this.userService.updateMessage(message.id, message.editedContent).subscribe(
      (response) => {
        console.log('Message updated successfully:', response);
        message.isEditing = false;
        message.content = message.editedContent;
        this.toastr.success('Message updated successfully');
      },
      (error) => {
        console.error('Error updating message:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
        this.toastr.error(error.message);
      }
    );
  }

  cancelEdit(message: any) {
    message.isEditing = false;
    message.editedContent = message.originalContent;
  }

  deleteMessage(messageId: string) {
    this.userService.deleteMessage(messageId).subscribe(
      (response) => {
        console.log('Message deleted successfully:', response);
        this.toastr.success('Message deleted successfully');
        this.isUpdateGroup = true;
        this.resetGroup();
      },
      (error) => {
        console.error('Error deleting message:', error);
        this.toastr.error(error.message);
      }
    );
    this.hideOptions();
  }

  ngOnDestroy() {
    this.clickOutsideSubscription.unsubscribe();
  }

  resetGroup() {
    this.isUpdateGroup = false;
  }
}
