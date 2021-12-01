import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'http';
}
export interface User {
  name: string;
  lname: string;
  role: string;
  phone: string;
  email: string;
  password: string;
  company: string;
  department: string;
}

export interface Message {
  message:string;
  user:string;
  time: Date;
  // read: boolean;
}