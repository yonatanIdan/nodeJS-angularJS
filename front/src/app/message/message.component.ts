import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  user: any;
  previewImage: string;

  constructor(
    private userservice: UserService,
  ) { }

  ngOnInit(): void {
    this.user = this.userservice.user;
    console.log('user face:', this.user.user);
    // if (this.user.user.photo) this.previewImage = "http://localhost:3010/" + this.user.user.photo
    if (this.user.user.photo) {
      this.previewImage = "https://rtfs0620.xyz:3012/image/" + this.user.user.photo;
      console.log(this.previewImage);
    }
  }

}
