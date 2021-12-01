import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
student = false;
user: any = {}

  constructor(
    private userservice: UserService,
  ) {}

  ngOnInit(): void {
    this.userservice.allUsers(() => {})
    this.user = this.userservice.user;
    console.log('role:', this.user.user.role);
    if(this.user.user.role === 'student') this.student = true;
  }
    
}
