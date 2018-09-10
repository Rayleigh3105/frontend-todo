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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {AddCategorieDialogComponent} from './todo/todo-header/add-categorie-dialog/add-categorie-dialog.component';
import { DeleteCategorieConfirmDialogComponent } from './delete-categorie-confirm-dialog/delete-categorie-confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AddCategorieDialogComponent,
    DeleteCategorieConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TodoModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,


  ],
  entryComponents: [AddCategorieDialogComponent, DeleteCategorieConfirmDialogComponent],
  providers: [ UserLoginService, MatDialog ],
  bootstrap: [AppComponent],
  exports:[ HttpClientModule ]
})
export class AppModule { }
