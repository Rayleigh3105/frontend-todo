import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Categorie} from '../../../categorie';
import {CategorieService} from '../../../categorie.service';
import {TodoService} from '../../todo.service';
import {TodoHeaderComponent} from '../todo-header.component';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-add-categorie-dialog',
  templateUrl: './add-categorie-dialog.component.html',
  styleUrls: ['./add-categorie-dialog.component.scss']
})
export class AddCategorieDialogComponent implements OnInit, OnDestroy{

  // VARIABLES
  formControl = this.createForm();
  categorie: Categorie;
  selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');
  private subscriptons: Subscription[] = [];

  // LIFECYCLEHOOKS
  ngOnDestroy() {
    this.subscriptons.forEach( subscriptions => subscriptions.unsubscribe() );
  }

  ngOnInit() {
  }

  constructor( public dialogRef: MatDialogRef<AddCategorieDialogComponent>,  public $categorie: CategorieService, public $todo: TodoService ) {}

  // CREATES CATEGORIE
  // - sets sessionStorage for new Categorie
  // - sets Header in TodoHeader
  // - closes the Dialog
  createCategorie() {
    sessionStorage.setItem('currentSelectedCategorie', this.formControl.value.categorie);
    this.categorie = {
      text: this.formControl.value.categorie
    };

    this.subscriptons.push(this.$categorie.createCategorie( this.categorie ).subscribe(data => {
      TodoHeaderComponent.updateCategorieStatus.next(data.toString());
    }));

    this.dialogRef.close(this.formControl.value.categorie);
  }

  // SETS SESSIONSTORAGE AFTER SELECT
  // - closes the dialog
  // - gets todos for selected categorie
  setCategorieSessionStorage(data) {
    this.selectedCategorie = data;
    sessionStorage.setItem('currentSelectedCategorie', data);

    this.subscriptons.push(this.$todo.getAllTodos().subscribe(data => {
      TodoHeaderComponent.updateCategorieStatus.next(data.toString());
    }));

    this.dialogRef.close();
  }

  // DELETES CURRENT CATEGORIE
  // - in DB and sessionStorage
  // Todo - After deletion of Categorie it should chanage to an existing one
  deleteCurrentCategorie( categorie: Categorie) {
    sessionStorage.removeItem('currentSelectedCategorie');
    this.subscriptons.push(this.$categorie.deleteCategorieById( categorie ).subscribe(data => {
      TodoHeaderComponent.updateCategorieStatus.next(this.$categorie.categories$.value.toString());
    }));
  }

  createForm(): FormGroup {
    return new FormGroup({
      categorie: new FormControl()
    });
  }
}
