import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {Todo} from '../todo';
import {FormControl, FormGroup,} from '@angular/forms';
import {CategorieService} from '../../categorie.service';
import {Subscription} from 'rxjs/Subscription';
import {AddCategorieDialogComponent} from '../todo-header/add-categorie-dialog/add-categorie-dialog.component';
import {UserLoginService} from '../../login/user-login.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnDestroy {

  // VARIABLES
  todoToCreate: Todo;

  formControl = this.createForm();
  selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');
  categorieExists: boolean;
  todoExists: boolean = false;
  private subscriptons: Subscription[] = [];
  dialogRefC: MatDialogRef<AddCategorieDialogComponent>;


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
  constructor(public $todo: TodoService, private $user: UserLoginService,private router: Router, public dialog: MatDialog) {

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
    this.dialogRefC = this.dialog.open(AddCategorieDialogComponent);

    this.subscriptons.push(this.dialogRefC.afterClosed().subscribe( result => {
      this.checkIfDisabled();
      this.todoExists = true;
      this.subscriptons.push( this.$todo.getAllTodos().subscribe() );
      this.selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');
    }));
  }

  // CREATE
  createTodo() {
    this.todoToCreate = {
      text: this.formControl.value.text,
      categorie: sessionStorage.getItem('currentSelectedCategorie')
    };
    this.todoExists = true;
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
