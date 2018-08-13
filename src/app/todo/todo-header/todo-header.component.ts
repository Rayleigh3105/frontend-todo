import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import {Todo} from '../todo';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {

  todoToCreate: Todo;

  constructor( private $todo: TodoService ) { }

  createTodo( todoText : String ) {
    this.todoToCreate = {
      text: todoText
    };
    this.$todo.createTodo( this.todoToCreate ).subscribe();
  }
  ngOnInit() {
  }

}
