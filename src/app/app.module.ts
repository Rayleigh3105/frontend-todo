import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {TodoModule} from './todo/todo.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './login/login.component';
import {UserLoginService} from "./login/user-login.service";
import {HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import {MatTabsModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TodoModule,
    BrowserAnimationsModule,
    MatTabsModule,

],
  providers: [ UserLoginService ],
  bootstrap: [AppComponent],
  exports:[ HttpClientModule ]
})
export class AppModule { }
