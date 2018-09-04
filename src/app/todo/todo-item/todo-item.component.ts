import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {Todo} from '../todo';
import {FormControl, FormGroup,} from '@angular/forms';
import {CategorieService} from '../../categorie.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnDestroy {

  // VARIABLES
  todoToCreate: Todo;

  formControl = this.createForm();
  categorieExists: boolean;
  private subscriptons: Subscription[] = [];

  // Lifecyclehooks
  ngOnDestroy() {
    // Unsubscribe all Subscribtion´s on Destroy
    this.subscriptons.forEach( subscription => subscription.unsubscribe() );
  }

  ngOnInit() {
  }


  // CONSTRUCTOR
  constructor(public $todo: TodoService, public $categorie: CategorieService) {
    this.checkIfDisabled();
    this.subscriptons.push(this.$categorie.getAllCategories().subscribe()) ;
  }

  // METHODS

  // Checks if Categorie is safed in Session Storage
  checkIfDisabled() {
    if ( !sessionStorage.getItem('currentSelectedCategorie' ) ) {
      this.formControl.disable();
      this.categorieExists = true;
    } else {
      this.formControl.enable();
      this.categorieExists = false;
    }
  }

  // CREATE
  createTodo() {
    this.todoToCreate = {
      text: this.formControl.value.text,
      categorie: sessionStorage.getItem('currentSelectedCategorie')
  };

    this.formControl.value.text = '';
    this.subscriptons.push( this.$todo.createTodo(this.todoToCreate).subscribe() ) ;
  }

  // DELETE
  deleteTodo( todo : Todo ) {
    this.subscriptons.push( this.$todo.deleteTodoById( todo ).subscribe() );
  }

  // UPDATE
  updateTodoCompleted( todo: Todo ) {
    this.subscriptons.push( this.$todo.updateTodo( todo ).subscribe() );
  }

  createForm(): FormGroup {
    return new FormGroup({
      text: new FormControl()
    });

  }

}
