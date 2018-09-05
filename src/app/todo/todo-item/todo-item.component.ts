import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {Todo} from '../todo';
import {FormControl, FormGroup,} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {AddCategorieDialogComponent} from '../todo-header/add-categorie-dialog/add-categorie-dialog.component';
import {UserLoginService} from '../../login/user-login.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';
import {UserInformationComponent} from '../../user-information/user-information.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnDestroy {

  // VARIABLES
  todoToCreate: Todo;
  formControl = this.createForm();
  formTodoInput = this.createTodoForm();
  selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');
  categorieExists: boolean;
  todoExists: boolean = false;
  private subscriptons: Subscription[] = [];
  dialogRefAddCategorie: MatDialogRef<AddCategorieDialogComponent>;
  dialogRefUserInfo: MatDialogRef<UserInformationComponent>;


  // Lifecyclehooks
  ngOnDestroy() {
    sessionStorage.removeItem('x-auth');
    sessionStorage.removeItem('currentSelectedCategorie');

    // Unsubscribe all Subscribtion´s on Destroy
    this.subscriptons.forEach( subscription => subscription.unsubscribe() );
  }

  ngOnInit() {
    this.checkIfDisabled();
    this.subscriptons.push(this.$todo.getAllTodos().subscribe());
  }


  // CONSTRUCTOR
  constructor(public $todo: TodoService, private $user: UserLoginService,private router: Router, public dialog: MatDialog, location: PlatformLocation) {
    location.onPopState( () => {
      this.subscriptons.push( this.$user.logoutUser().subscribe() );
      this.router.navigate(['/login']);
    });
    window.onbeforeunload = function () {
      sessionStorage.removeItem('currentSelectedCategorie');
    }
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

  logoutUser() {
    this.subscriptons.push( this.$user.logoutUser().subscribe() );
    this.router.navigate(['/login']);
  }

  openCreateCategorieDialog() {
    this.dialogRefAddCategorie = this.dialog.open(AddCategorieDialogComponent);

    this.subscriptons.push(this.dialogRefAddCategorie.afterClosed().subscribe(result => {
      this.checkIfDisabled();
      this.todoExists = true;
      this.subscriptons.push( this.$todo.getAllTodos().subscribe() );
      this.selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');
    }));
  }

  openUserInformation() {
    this.dialogRefUserInfo = this.dialog.open(UserInformationComponent);
  }


  // CREATE
  createTodo() {
    this.todoToCreate = {
      text: this.formControl.value.text,
      categorie: sessionStorage.getItem('currentSelectedCategorie')
    };
    this.todoExists = true;
    this.formControl.value.text = '';
    this.subscriptons.push( this.$todo.createTodo( this.todoToCreate ).subscribe() ) ;
  }

  // DELETE
  deleteTodo( todo : Todo ) {
    this.subscriptons.push( this.$todo.deleteTodoById( todo ).subscribe() );
  }
  // UPDATE TEXT
  updateTodo( todo: Todo ){
    todo.text = this.formTodoInput.value.todoInput;
    this.subscriptons.push( this.$todo.updateTodo( todo ).subscribe() )
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

  createTodoForm(): FormGroup {
    return new FormGroup({
      todoInput: new FormControl()
    });
  }
}
