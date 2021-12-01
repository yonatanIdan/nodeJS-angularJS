import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Message } from '../app.component';

class socketMessage implements Message{
  message: string;
  user: string;
  time: Date;
  // read: boolean;
   
  constructor(message: string, id: string){
    const answer = JSON.parse(message);
    console.log('answer', answer, 'id:' ,id );
    this.message = answer.message;
    if (id === answer.id) this.user = 'Me';
    else if (!answer.user) this.user = answer.id;
    else this.user = answer.user;
    this.time = new Date();
    // this.read = answer.read;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
socket: any;
all = [];

constructor() {
    this.socket = io("https://rtfs0620.xyz:3012");
    // this.socket = io("http://localhost:3010");
    this.socket.on("users",(all)=>{
      this.all = all;
    });
  }

  join(data){
    this.socket.emit('join', data);
  }

  allUsers(){
    return new Observable((observer)=>{
      observer.next(this.all);
    });
  }
  
  sendPrivateMessage(partner: string, myName: string, message: string){
    this.socket.emit("private message", partner, myName, message);
  }
  
  getPrivateMessage() {
    return new Observable((observer)=>{
      this.socket.on("answer private",(answ: string)=>{
        let messPrivate = new socketMessage(answ, this.socket.id);
        observer.next(messPrivate);
      });
    });
  }
  
  sendMessage(message: string, myName:string){
    this.socket.emit("question", message, myName);
  }

  getMessage() {
    return new Observable((observer)=>{
      this.socket.on("answer",(answ: string)=>{
        let mess = new socketMessage(answ, this.socket.id);
        observer.next(mess);
      });
    });
  }

  leave(){
    this.socket.disconnect();
  }
  
}
