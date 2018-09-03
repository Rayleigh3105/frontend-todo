import {Component, HostBinding, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {Todo} from '../todo';
import {FormControl, FormGroup,} from '@angular/forms';
import {CategorieService} from '../../categorie.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  todoToCreate: Todo;
  formControl = this.createForm();
  categorieExists: boolean;

  constructor(public $todo: TodoService, public $categorie: CategorieService) {
    this.checkIfDisabled();
    this.$categorie.getAllCategories().subscribe();
  }

  checkIfDisabled() {
    if ( !sessionStorage.getItem('currentSelectedCategorie' ) ) {
      this.formControl.disable();
      this.categorieExists = true;
    } else {
      this.formControl.enable();
      this.categorieExists = false
    }
  }


  createTodo() {
    this.todoToCreate = {
      text: this.formControl.value.text,
      categorie: sessionStorage.getItem('currentSelectedCategorie')
  };

    this.formControl.value.text = '';
    this.$todo.createTodo(this.todoToCreate).subscribe();
  }

  ngOnInit() {
  }


  createForm(): FormGroup {
    return new FormGroup({
      text: new FormControl()
    })

  }

  deleteTodo( todo : Todo ) {
    this.$todo.deleteTodoById( todo ).subscribe()
  }

  updateTodoCompleted( todo: Todo ) {
    this.$todo.updateTodo( todo ).subscribe();
  }

}
