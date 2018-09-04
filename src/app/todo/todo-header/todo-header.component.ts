import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserLoginService} from "../../login/user-login.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddCategorieDialogComponent} from './add-categorie-dialog/add-categorie-dialog.component';
import {Categorie} from '../../categorie';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit, OnDestroy {

  categorie: Categorie;
  selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');
  dialogRefC: MatDialogRef<AddCategorieDialogComponent>;
  private subscribtions: Subscription[] = [];


  constructor( private $user: UserLoginService, private router: Router, public dialog: MatDialog, private $todo: TodoService) {}

    ngOnInit() {
    }

    ngOnDestroy() {
        sessionStorage.removeItem('x-auth');
        sessionStorage.removeItem('currentSelectedCategorie');

        // Unsubscribe Subscribtions
      this.subscribtions.forEach( subscriptions => subscriptions.unsubscribe() )

    }

    logoutUser() {
      this.$user.logoutUser();
      this.router.navigate(['/login']);
    }

    openCreateCategorieDialog() {
      this.dialogRefC = this.dialog.open(AddCategorieDialogComponent);

      this.subscribtions.push(this.dialogRefC.afterClosed().subscribe( result => {
        this.subscribtions.push( this.$todo.getAllTodos().subscribe() );
        this.selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');
      }));
    }
}
