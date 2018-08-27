import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

    constructor(private $http: HttpClient) { }

  createUser( user: User )  {
      return this.$http.post<User>( environment.endpoint + "users", user , {observe: 'response'})
          .pipe(
              map( ( response: Response ) => {
                  sessionStorage.setItem('x-auth', response.headers.get('x-auth'));
              })
          ).toPromise();
  }

  loginUser( user: User ) {
      return this.$http.post<User>( environment.endpoint + "users/login", user , {observe: 'response'})
          .pipe(
              map( ( response: Response ) => {
                  sessionStorage.removeItem('x-auth');
                  sessionStorage.setItem('x-auth', response.headers.get('x-auth'));
              })
          ).toPromise();
  }

  logoutUser() {
      let headers = {
          'x-auth': sessionStorage.getItem('x-auth')
      };

      let requestOptions = {
          headers: new HttpHeaders(headers)
      };

        return this.$http.delete(environment.endpoint + "users/me/token", requestOptions)
  }

}
