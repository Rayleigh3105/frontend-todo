import { Component, OnInit } from '@angular/core';
import {UserLoginService} from "./user-login.service";
import {User} from "../user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formControl = this.createForm();
    user: User;

  constructor( private $userlogin: UserLoginService, private router: Router) { }

  ngOnInit() {
  }

  createUser(  ) {
      this.user = {
          email: this.formControl.value.email,
          password: this.formControl.value.password
      }

      this.$userlogin.createUser( this.user )
          .then( () => {
              this.router.navigate(['/dashboard'])
          });
  }
    loginUser( ) {
        this.user = {
            email: this.formControl.value.email,
            password: this.formControl.value.password
        };

        this.$userlogin.loginUser( this.user )
            .then( () => {
                this.router.navigate(['/dashboard'])
            });
    }

    createForm(): FormGroup {
      return new FormGroup({
          email: new FormControl('', [ Validators.required ]),
          password: new FormControl()
      })
  }



}
