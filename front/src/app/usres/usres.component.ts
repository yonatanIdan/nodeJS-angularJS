import { Component, OnInit } from '@angular/core';
import { User } from '../app.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-usres',
  templateUrl: './usres.component.html',
  styleUrls: ['./usres.component.css']
})

export class UsresComponent implements OnInit {
  users: User[]= [];

  displayedColumns: string[] = ['name', 'email', 'phone', 'role'];

  constructor(
    private userservice: UserService,
  ) { }

  ngOnInit(): void {
    this.userservice.refershUsers
    .subscribe(()=>{
      this.users = this.userservice.users;
    })
  }

  updateUser(usr){
    console.log('usr', usr);
    this.userservice.setUser2Update(usr);
  }

}

