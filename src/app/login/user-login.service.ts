import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, tap} from 'rxjs/operators';

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

  getCurrentUser(): Promise<User> {
    return this.$http.get<User>( environment.endpoint + "users/me", this.updatexAuthHeader()).toPromise()

  }

  logoutUser() {
        return this.$http.delete(environment.endpoint + "users/me/token", this.updatexAuthHeader() )
  }

  updatexAuthHeader() {
    let headers = {
      'x-auth': sessionStorage.getItem('x-auth')
    };

    let requestOptions = {
      headers: new HttpHeaders(headers)
    };

    return requestOptions
  }

}
