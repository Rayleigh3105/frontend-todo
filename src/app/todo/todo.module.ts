import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {HttpClientModule} from '@angular/common/http';
import {TodoService} from './todo.service';
import {
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSliderModule
} from '@angular/material';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
      MatListModule,
      MatSliderModule



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
    TodoService
  ],
})
export class TodoModule { }
