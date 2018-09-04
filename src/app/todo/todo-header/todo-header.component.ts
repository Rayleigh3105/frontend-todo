import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserLoginService} from "../../login/user-login.service";
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material';
import {AddCategorieDialogComponent} from './add-categorie-dialog/add-categorie-dialog.component';
import {Categorie} from '../../categorie';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit, OnDestroy {
  @Input()
  com1ref: Function;

  public static updateCategorieStatus : Subject<string> = new Subject<string>();

  categorie: Categorie;
  selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');

  constructor( private $user: UserLoginService, private router: Router, public dialog: MatDialog ) {}

    ngOnInit() {
      TodoHeaderComponent.updateCategorieStatus.subscribe(res => {
        this.selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');
        this.com1ref;
      })
    }

    ngOnDestroy() {
        sessionStorage.removeItem('x-auth');
        sessionStorage.removeItem('currentSelectedCategorie');

        // Unsubscribe Subscribtions
      TodoHeaderComponent.updateCategorieStatus.unsubscribe();
    }

    logoutUser() {
      this.$user.logoutUser();
      this.router.navigate(['/login']);
    }

    openCreateCategorieDialog() {
      this.dialog.open(AddCategorieDialogComponent);
    }
}
