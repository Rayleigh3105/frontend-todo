import { Component, OnInit } from '@angular/core';
import {UserLoginService} from '../login/user-login.service';
import {User} from '../user';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {

  currentUserName: string;
  currentUser: User;

  constructor( private $user: UserLoginService ) {
    this.$user.getCurrentUser().then( user => {
      this.currentUser  = user;
      this.currentUserName = user.email.substr(0, user.email.indexOf('@'));
      sessionStorage.setItem('currentUserName', this.currentUserName);
    });
  }

  ngOnInit() {
  }

}
