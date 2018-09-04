import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserLoginService} from './user-login.service';
import {User} from '../user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  // VARIABLES
  formControl = this.createForm();

  user: User;
  private subscriptons: Subscription[] = [];

  // LIFECYCLEHOOKS
  ngOnDestroy() {
    this.subscriptons.forEach( subscribtions => subscribtions.unsubscribe() );
  }

  ngOnInit() {
  }

  constructor(private $userlogin: UserLoginService, private router: Router) {}

  // SIGN IN A USER
  createUser() {
    this.user = {
      email: this.formControl.value.email,
      password: this.formControl.value.password
    };

    this.$userlogin.createUser(this.user)
      .then(() => {
        this.router.navigate(['/dashboard']);
      });
  }

  // LOGIN A USER
  loginUser() {
    this.user = {
      email: this.formControl.value.email,
      password: this.formControl.value.password
    };

    this.$userlogin.loginUser(this.user)
      .then(() => {
        this.router.navigate(['/dashboard']);
      });
  }

  createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl()
    });
  }


}
