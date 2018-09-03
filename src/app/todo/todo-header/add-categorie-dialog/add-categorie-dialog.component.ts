import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Categorie} from '../../../categorie';
import {CategorieService} from '../../../categorie.service';
import {TodoService} from '../../todo.service';
import {TodoHeaderComponent} from '../todo-header.component';
import {TodoItemComponent} from '../../todo-item/todo-item.component';

@Component({
  selector: 'app-add-categorie-dialog',
  templateUrl: './add-categorie-dialog.component.html',
  styleUrls: ['./add-categorie-dialog.component.scss']
})
export class AddCategorieDialogComponent implements OnInit {


  formControl = this.createForm();
  categorie: Categorie;
  selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');

  constructor( public dialogRef: MatDialogRef<AddCategorieDialogComponent>,  public $categorie: CategorieService, public $todo: TodoService, private todoItem: TodoItemComponent) {
  }

  createCategorie() {
    sessionStorage.setItem('currentSelectedCategorie', this.formControl.value.categorie);
    this.categorie = {
      text: this.formControl.value.categorie
    };

    this.$categorie.createCategorie( this.categorie ).subscribe(data => {
      TodoHeaderComponent.updateCategorieStatus.next(data.toString());
    });

    this.dialogRef.close(this.formControl.value.categorie);
  }

  setCategorieSessionStorage(data) {
    this.selectedCategorie = data;
    sessionStorage.setItem('currentSelectedCategorie', data);

    this.$todo.getAllTodos().subscribe(data => {
      TodoHeaderComponent.updateCategorieStatus.next(data.toString());
    });

    this.dialogRef.close();
  }

  ngOnInit() {
  }

  createForm(): FormGroup {
    return new FormGroup({
      categorie: new FormControl()
    })
  }

  deleteCurrentCategorie( categorie: Categorie) {
    sessionStorage.removeItem('currentSelectedCategorie');
    this.$categorie.deleteCategorieById( categorie ).subscribe(data => {
      TodoHeaderComponent.updateCategorieStatus.next(this.$categorie.categories$.value.toString());
    })
  }
}
