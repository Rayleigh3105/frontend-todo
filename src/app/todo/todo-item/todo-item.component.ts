import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import {Todo} from '../todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  constructor( public $todo: TodoService ) {
    $todo.getAllTodos().subscribe();
  }

  deleteTodo( todo : Todo ) {
    this.$todo.deleteTodoById( todo ).subscribe()
  }
  ngOnInit() {
  }

}
