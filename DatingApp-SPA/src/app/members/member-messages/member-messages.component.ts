import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  newMessageForm: FormGroup;

  constructor(private userService: UserService, private authService: AuthService, private alertify: AlertifyService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loadMessages();
    this.newMessageForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  loadMessages() {
    const currentUserId = this.authService.loggedInId();
    this.userService.getMessageThread(this.authService.loggedInId(), this.recipientId)
    .pipe(
      tap(messages => {
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < messages.length; index++) {
          const element = messages[index];
          if (element.isRead === false && element.recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, element.id);
          }
        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    if (this.newMessageForm.valid) {
      this.newMessage.recipientId = this.recipientId;
      this.newMessage.content = this.newMessageForm.get('content').value;
      this.newMessageForm.patchValue({content: ''});
      this.userService.sendMessage(this.authService.loggedInId(), this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);

    }, error => {
      this.alertify.error(error);
    });
    }
  }
}
