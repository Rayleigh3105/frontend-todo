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
  MatListModule,
  MatSliderModule
} from '@angular/material';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import {FormsModule} from '@angular/forms';
import {UserLoginService} from "../login/user-login.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule
  ],
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoHeaderComponent,
  ],
  exports: [
    TodoListComponent
  ]
  ,providers: [
    TodoService,
    UserLoginService
  ],
})
export class TodoModule { }
