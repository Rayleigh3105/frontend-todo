import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {Todo} from '../todo';
import {UserLoginService} from "../../login/user-login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit, OnDestroy {

  todoToCreate: Todo;

  constructor( private $todo: TodoService, private $user: UserLoginService, private router: Router ) { }

  createTodo( todoText : any ) {
    this.todoToCreate = {
      text: todoText.value
    };

    todoText.value = '';
    this.$todo.createTodo( this.todoToCreate ).subscribe();
  }

  logoutUser() {
     this.$user.logoutUser();
     this.router.navigate(['/login']);
  }
  ngOnInit() {}

  ngOnDestroy() {
      sessionStorage.removeItem('x-auth');
  }

}
