import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {HttpClientModule} from '@angular/common/http';
import {TodoService} from './todo.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  declarations: [
    TodoListComponent,
    TodoItemComponent
  ],
  exports: [
    TodoListComponent
  ]
  ,providers: [
    TodoService
  ]
})
export class TodoModule { }
