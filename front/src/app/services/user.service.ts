import { Injectable } from '@angular/core';
import { User } from '../app.component';
import { Subject } from 'rxjs';
import { ServerAPIService } from './server-api.service';
import { IsloggedinService } from '../auth/isloggedin.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[];
  user: User[]; //interface

  refershUsers = new Subject();
  user2Update = new Subject();
  userFace = new Subject();

  constructor(
    private api: ServerAPIService,
    private loginservice: IsloggedinService,
    ) {}

  newUser(data, callback) {
    // let dataServer = {
    //   user: data,
    // };
    console.log('data user service', data);
    this.api.newUser(JSON.stringify(data)).subscribe(
      (res: any) => {
        this.allUsers(()=>{callback(null, res);})
      },
      (error) => {
        console.log('error', error);
        callback(error, null);
      }
    );
  }

  setUser2Update(user2) {
    this.user2Update.next(user2);
  }

  updateUser(data, callback) {
    // let dataServer = {
    //   user: data,
    // };
    this.api.updateUser(JSON.stringify(data)).subscribe(
      (res: any) => {
        this.allUsers(()=>{callback(null, res);})
      },
      (error) => {
        console.log('error', error);
        callback(error, null);
      }
    );
  }

  allUsers(callback) {
    this.api.users().subscribe(
      (res: any) => {
        this.users = res;
        this.refershUsers.next();
        callback(null, res);
      },
      (error) => {
        console.log('error', error);
        callback(error, null);
      }
    );
  }

  deleteUser(data, callback) {
    let userEmail = {
      email: data,
    };
    console.log('user Email:', userEmail);
    this.api.deleteuser(JSON.stringify(userEmail)).subscribe(
      (res: any) => {
        this.allUsers(()=>{callback(null, res);})
      },
      (error) => {
        console.log('error', error);
        callback(error, null);
      }
    );
  }

  login(login, callback) {
    this.api.loginUser(JSON.stringify(login))
    .subscribe((res:any)=>{
      console.log('Login Reault', res);
      this.user = res;
      this.loginservice.setToken(res.token);
      this.loginservice.setLogin(true);
      callback(false, res);
    }, (error) => {
      console.log('error', error);
      callback(error, null);
    });
  }

  uploadPic(fileData, previewUrl){
    // console.log('preview Url:', this.previewUrl);
    const file2Server = {
      name: fileData.name,
      dirname: '',
      blob: previewUrl,
    };
    this.api.writeFileBase64(JSON.stringify(file2Server))
    .subscribe((res:any)=>{
      console.log('result', res);
    }, (error) => {
      console.log('error', error);
    });
  }
}
