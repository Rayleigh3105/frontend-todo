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
  MatSliderModule, MatTooltipModule
} from '@angular/material';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserLoginService} from "../login/user-login.service";

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
    MatTooltipModule
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
