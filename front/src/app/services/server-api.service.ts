import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IsloggedinService } from '../auth/isloggedin.service';

@Injectable({
  providedIn: 'root',
})
export class ServerAPIService {

  constructor(
    private http: HttpClient,
    private loginservice: IsloggedinService,
  ) {}

  URL: string = 'https://rtfs0620.xyz:3012/';
  // URL: string = 'http://localhost:3010/';

  messageUser(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.loginservice.getToken()
      }),
    };
    return this.http.post(
      (this.URL + 'chats/messageUser'),
      data,
      httpOptions
    );
  }

  allMessages() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.loginservice.getToken() }),
    };
    return this.http.get((this.URL + 'chats/messages'), httpOptions);
  }
  
  privateMessages(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.loginservice.getToken()
      }),
    };
    return this.http.post(
      (this.URL + 'chats/privateMessages'),
      data,
      httpOptions
    );
  }

  messageUpdate(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.loginservice.getToken()
      }),
    };
    return this.http.post(
      (this.URL + 'chats/messageUpdate'),
      data,
      httpOptions
    );
  }

  messageDelete(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.loginservice.getToken()
      }),
    };
    return this.http.post(
      (this.URL + 'chats/messageDelete'),
      data,
      httpOptions
    );
  }
  
  newUser(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.loginservice.getToken()
      }),
    };
    return this.http.post(
      (this.URL + 'users/newuser'),
      data,
      httpOptions
    );
  }

  updateUser(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.loginservice.getToken()
      }),
    };
    return this.http.post(
      (this.URL + 'users/updateuser'),
      data,
      httpOptions
    );
  }

  deleteuser(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.loginservice.getToken()
      }),
    };
    return this.http.post(
      (this.URL + 'users/deleteuser'),
      data,
      httpOptions
    );
  }

  users() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.loginservice.getToken() }),
    };
    return this.http.get((this.URL + 'users/users'), httpOptions);
  }

  loginUser(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post((this.URL + 'login'), data, httpOptions );
  }
  
  writeFileBase64(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.loginservice.getToken()
      }),
    };
    return this.http.post(
      (this.URL + 'writefilebase64'),
      data,
      httpOptions
    );
  }
}
