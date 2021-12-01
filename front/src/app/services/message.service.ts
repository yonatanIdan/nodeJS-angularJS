import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../app.component';
import { ServerAPIService } from './server-api.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  Messages = [];
  PrivateMessages = [];

  refershMessages = new Subject();
  refershPrivateMessages = new Subject();

  constructor(private api: ServerAPIService) {}

  newMessage(data, callback) {
    this.api.messageUser(JSON.stringify(data)).subscribe(
      (res: any) => {
        console.log('res newMessage', res);
        callback(null, res);
      },
      (error) => {
        console.log('error newMessage', error);
        callback(error, null);
      }
    );
  }

  allMessages(callback) {
    this.api.allMessages().subscribe(
      (res: any) => {
        this.Messages = res;
        this.refershMessages.next();
        callback(null, res);
      },
      (error) => {
        console.log('error', error);
        callback(error, null);
      }
    );
  }

  privateMessage(data, callback) {
    this.api.privateMessages(JSON.stringify(data)).subscribe(
      (res: any) => {
        this.PrivateMessages = res;
        this.refershPrivateMessages.next();
        callback(null, res);
      },
      (error) => {
        console.log('error', error);
        callback(error, null);
      }
    );
  }

  messageDelete(data, callback) {
    this.api.messageDelete(JSON.stringify(data)).subscribe(
      (res: any) => {
        callback(null, res);
      },
      (error) => {
        console.log('error', error);
        callback(error, null);
      }
    );
  }

  updateMessages(data, callback) {
    this.api.messageUpdate(JSON.stringify(data)).subscribe(
      (res: any) => {
        console.log('res updated messages', res);
      },
      (error) => {
        console.log('error', error);
        callback(error, null);
      }
    );
  }
}
