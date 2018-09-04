import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {HttpClientModule} from '@angular/common/http';
import {TodoService} from './todo.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule, MatSidenavModule,
  MatSliderModule, MatTooltipModule
} from '@angular/material';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserLoginService} from "../login/user-login.service";
import {CategorieService} from '../categorie.service';
import { AddCategorieDialogComponent } from './todo-header/add-categorie-dialog/add-categorie-dialog.component';
import {UserInformationComponent} from '../user-information/user-information.component';

@NgModule({
  imports: [
    CommonModule,
      ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSidenavModule,
  ],
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoHeaderComponent,
    UserInformationComponent
  ],
  exports: [
    TodoListComponent
  ]
  ,providers: [
    TodoService,
    CategorieService,
    UserLoginService,
    TodoItemComponent,

  ],
  entryComponents: [
    AddCategorieDialogComponent,
    UserInformationComponent
  ]
})
export class TodoModule { }
