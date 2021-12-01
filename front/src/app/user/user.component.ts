import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../app.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userForm: any;

  admin:boolean = false;
  user:any = {}

  update:boolean = false;

  roles: any = [
    {value: 'student', viewValue: 'Student'},
    {value: 'teacher', viewValue: 'Teacher'},
    {value: 'admin', viewValue: 'Admin'}
  ];

  constructor(
    private userservice: UserService,
    // private sanitizer: DomSanitizer,
    ) {
      this.userForm = new FormGroup({
        name: new FormControl('',[Validators.pattern("[\- a-zA-Zא-ת\s]+$"),Validators.required]),
        lname: new FormControl(''),
        role: new FormControl('student'),
        phone: new FormControl('',Validators.pattern("[0-9]{9,10}")),
        email: new FormControl('',Validators.email),
        password: new FormControl('',Validators.required),
        photo: new FormControl(''),
        // company: new FormControl(''),
        // department: new FormControl(''),
      });
    }

  ngOnInit(): void {
    this.userservice.user2Update.subscribe((user: User)=>{
      this.userForm.controls.name.setValue(user.name);
      this.userForm.controls.lname.setValue(user.lname);
      this.userForm.controls.role.setValue(user.role);
      this.userForm.controls.phone.setValue(user.phone);
      this.userForm.controls.email.setValue(user.email);
      this.userForm.controls.password.setValue('*******');
      this.update = true;
    })

    this.user = this.userservice.user;
    console.log('role for update btn:', this.user.user.role);
    if(this.user.user.role === 'admin') this.admin = true;
  }
  
  fileData: File = null;
  previewUrl: any = null;
  source: string;
  iamgeShow: boolean;
  
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log('fileData:',this.fileData);
    if (this.fileData) {
      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = () => {
        this.previewUrl = reader.result;
        // console.log('this.previewUrl', this.previewUrl);
      }
      console.log(this.fileData.name)
      this.userForm.controls['photo'].setValue(
        this.fileData.name, 
      )
    }
  }

  deleteData() {
    this.userForm.reset();
    this.userForm.controls.role.setValue('student');
    this.update= false;
  }

  callUser(): void {
    console.log('send user:', this.userForm.value);
    if (this.fileData) this.userservice.uploadPic(this.fileData, this.previewUrl);
    this.userservice.newUser(this.userForm.value, (error, result) => {
      if (error) console.log('status error:', error);
      else {
        console.log('status result:', result);
        this.deleteData();
      } 
    });
  }

  updateUser(): void {
    if (this.fileData) this.userservice.uploadPic(this.fileData, this.previewUrl);
    this.userservice.updateUser(this.userForm.value, (error, result) => {
      if (error) console.log('status error: you dont have this email -', error);
      if (result) {
        console.log('update user to:', this.userForm.value);
        console.log('status result:', result);
        this.deleteData();
      }
    });
  }

  deleteUser() {
    this.userservice.deleteUser(this.userForm.get('email').value, (error, result) => {
      if (error) console.log('status error:', error);
      else {
        console.log('delete user:', this.userForm.get('email').value);
        console.log('status result:', result);
        this.deleteData();
      }
    });
  }

  cancel(){
    this.deleteData();
  }

}
