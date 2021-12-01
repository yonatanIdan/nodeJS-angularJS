import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  hide = true;

  constructor(
    private router: Router,
    private userservice: UserService,
    private socketService:SocketService,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  openSnackBar() {
    this._snackBar.open('login successful! 🔒', 'close',{
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  login() {
    let login = {
      username: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    console.log('login User:', login);
    this.userservice.login(login,(error,result)=>{
      if (error) {
        this.loginForm.reset();
        return console.log('status error:', error);
      } else {
        this.openSnackBar();
        this.join();
        console.log('result:', result);
        this.router.navigate(['/message']);
      }
    });
  }

  join(){
    let user: any = this.userservice.user;
    let myName: string = user.user.name;
    this.socketService.join({user:myName, email: this.loginForm.get('email').value});
  }

}
