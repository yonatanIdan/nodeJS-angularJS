import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinService {
  token: string = '';
  loggedIn: boolean = false;
  loginEvent = new Subject();

  constructor( ) { }

  setLogin(login:boolean) {
    console.log('SetLogin:', login);
    this.loggedIn = login;
    return this.loginEvent.next(login);
  }

  getLogin() {
    console.log('getLogin:', this.loggedIn);
    return this.loggedIn;
  }

  getToken():string {
    return this.token;
  }
  
  setToken(token):void {
    return this.token = token;
  }
}
