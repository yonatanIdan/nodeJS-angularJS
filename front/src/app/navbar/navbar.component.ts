import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsloggedinService } from '../auth/isloggedin.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private isloggedinService: IsloggedinService,
    private socketService:SocketService,
    private userservice: UserService,
  ) {}

  ngOnInit(): void {
    this.isloggedinService.loginEvent.subscribe((login: any) => {
      this.isLoggedIn = login;
    });
    this.userservice.userFace.subscribe((userF: any) => {
      this.userName = userF.name;
      console.log('user face massege page:', this.userName);
    });
  }

  routerNavigate(navigate){
    this.router.navigate(['/'+ navigate + '']);
  }

  setLogout() {
    this.isloggedinService.setLogin(false);
    this.socketService.leave()
    this.router.navigate(['/']);
  }
}
