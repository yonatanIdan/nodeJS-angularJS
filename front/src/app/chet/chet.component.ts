import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../app.component';
import { MessageService } from '../services/message.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chet',
  templateUrl: './chet.component.html',
  styleUrls: ['./chet.component.css']
})
export class ChetComponent implements OnInit {
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  private scrollContainer: any;
  private isNearBottom = true;

  out_message: string = '';
  messages: Message[] = [];
  user: any = this.userservice.user;
  myName: string = this.user.user.name;
  users = [];
  usersOffline = [];

  constructor(
    private router: Router,
    private socketService: SocketService,
    private userservice: UserService,
    private _snackBar: MatSnackBar,
    private messageService: MessageService,
    public dialog: MatDialog,
  ) { }

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());  
  }

  ngOnInit(): void {
    this.reloadUsers();
    setInterval(() => {
      this.reloadUsers();
    }, 20000);

    this.messageService.allMessages(() => {})
    this.messageService.refershMessages.subscribe(()=>{
      for (let i = 0; i < this.messageService.Messages.length; i++) {
        let user;
        if(this.messageService.Messages[i].fromUserName == this.myName){
          user = 'Me'
        } else user = this.messageService.Messages[i].fromUserName
        let message = {
          message: this.messageService.Messages[i].Message,
          user : user,
          time: this.messageService.Messages[i].date,
          read: this.messageService.Messages[i].read,
        }
        this.messages.push(message);       
      }
    });

    this.socketService.getMessage().subscribe((Message: Message | any)=>{
      if(Message.user != 'Me'){
        let messageSnackBar = Message.user + ": " + Message.message;
        this.openSnackBar(messageSnackBar, 'bottom')
      }
      this.messages.push(Message);
      console.log('public messages', this.messages);
    });

  }

  updateMessage(partner){
    console.log('partner for update', partner.email);
    this.messageService.updateMessages({fromUser: partner.email, toUser: this.user.user.email}, (error, result) => {
      if (error) console.log('status error:', error);
      else console.log('status result:', result); 
    });
  }

  reloadUsers(){
    this.socketService.allUsers().subscribe(()=>{
      this.users = this.socketService.all;
      this.userservice.allUsers(()=>{})
      this.userservice.refershUsers.subscribe(()=>{
        this.usersOffline = this.userservice.users;
        for (let i = 0; i < this.users.length; i++) {
          if(this.users[i].email == this.user.user.email){
            this.users.splice(i, 1);
          }
        }
        for (let j = 0; j < this.usersOffline.length; j++) {
          if(this.usersOffline[j].email == this.user.user.email){
              this.usersOffline.splice(j, 1);
            }
            for (let i = 0; i < this.users.length; i++) {
              if(this.users[i].email == this.usersOffline[j].email){
                this.usersOffline.splice(j, 1);
              }
            }
        }
      })
    });
  }
  
  private onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      // behavior: 'smooth'
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  sendMessage(): void {
    if (this.out_message != ''){
      this.socketService.sendMessage(this.out_message, this.myName);
      this.messageUser('public')
      this.out_message = '';
    } else this.openSnackBar('you tried to send empty message', 'top')
  }

  messageUser(getMessage): void {
    let saveMessage = {
      "message": this.out_message,
      "emailSend": this.user.user.email, 
      "nameSend": this.myName, 
      "get": getMessage,
      "date": new Date(),
      "read": true,
    }
    this.messageService.newMessage(saveMessage, (error, result) => {
      if (error) console.log('status error:', error);
      else console.log('status result:', result); 
    });
  }

  messageDelete(): void {
    let emailSend = {
      "emailSend": this.user.user.email, 
    }
    this.messageService.messageDelete(emailSend, (error, result) => {
      if (error) console.log('status error:', error);
      else {
        console.log('status result:', result); 
        this.router.navigate(['/message']);
      }
    });
  }

  openSnackBar(mess: string, Position) {
    this._snackBar.open(mess, 'close',{
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: Position,
    });
  }
  
  openDialog(partner) {
    this.updateMessage(partner);
    this.dialog.open(DialogDataDialog, {
      data: {
        myName: this.myName,
        user: this.user,
        partner: partner,
      }
    });
  }
}

@Component({
  selector: 'dialog-data-dialog',
  templateUrl: 'dialog-data-dialog.html',
  styleUrls: ['./chet.component.css']
})
export class DialogDataDialog {
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  private scrollContainer: any;
  private isNearBottom = true;

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());  
  }

  privateMessage: Message[]= [];
  out_message: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: any,
    private messageService: MessageService,
    private socketService: SocketService,
    private _snackBar: MatSnackBar,
    ) {}
    
    ngOnInit(): void {
    this.reloadMessages();
    
    this.socketService.getPrivateMessage().subscribe((Message: Message)=>{
      if(Message.user != 'Me'){
        let messageSnackBar = Message.user + ": " + Message.message;
        this.openSnackBar(messageSnackBar, 'bottom')
      }
      this.privateMessage.push(Message);
      console.log('try again:', Message, this.privateMessage)
    });

    console.log(this.socketService.all)
  }

  reloadMessages(){
    let data = {
      toUser: this.data.partner.email,
      fromUser: this.data.user.user.email
    }
    this.messageService.privateMessage(data, (error, result) => {
      if (error) console.log('status error:', error);
      else console.log('status result for praivate massages:', result); 
    });
    this.messageService.refershPrivateMessages.subscribe(()=>{
      let PrivateMessages = [];
      for (let i = 0; i < this.messageService.PrivateMessages.length; i++) {
        let user;
        if(this.messageService.PrivateMessages[i].fromUserName == this.data.myName){
          user = 'Me'
        } else user = this.messageService.PrivateMessages[i].fromUserName
        let message = {
          message: this.messageService.PrivateMessages[i].Message,
        user : user,
        time: this.messageService.PrivateMessages[i].date,
        read: this.messageService.PrivateMessages[i].read,
      }
      PrivateMessages.push(message);       
    }
    this.privateMessage = PrivateMessages;
    });
  }

  private onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }
  
  messageUser(getMessage, partner): void {
    let read = false;
    for (let i = 0; i < this.socketService.all.length; i++) {
      console.log("dd",this.socketService.all[i] , partner)
      if(this.socketService.all[i].id === partner.id) {
        read = true
      }; 
    }
    let saveMessage = {
      "message": this.out_message,
      "emailSend": this.data.user.user.email, 
      "nameSend": this.data.myName, 
      "get": getMessage,
      "date": new Date(),
      "read": read,
    }
    console.log("message", saveMessage);
    this.messageService.newMessage(saveMessage, (error, result) => {
      if (error) console.log('status error:', error);
      else console.log('status result:', result);
    });
  }

  sendPrivateMessage(partner): void {
    if (this.out_message != '' && this.out_message != '\n'){
      this.socketService.sendPrivateMessage(partner, this.data.myName , this.out_message);
      this.messageUser(partner.email, partner)
      let data = {
        toUser: partner.email,
        fromUser: this.data.user.user.email
      }
      this.messageService.privateMessage(data, (error, result) => {
        if (error) console.log('status error:', error);
        else console.log('status result for praivate massages:', result); 
      });
      this.out_message = '';
    } else {
      this.openSnackBar('you tried to send empty message', 'top');
      this.out_message = '';
    }
  }

  openSnackBar(mess: string, Position) {
    this._snackBar.open(mess, 'close',{
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: Position,
    });
  }
}
