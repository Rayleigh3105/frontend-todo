import {Component,  OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Categorie} from '../../../categorie';
import {CategorieService} from '../../../categorie.service';
import {TodoService} from '../../todo.service';
import {Subscription} from 'rxjs/Subscription';
import {DeleteCategorieConfirmDialogComponent} from '../../../delete-categorie-confirm-dialog/delete-categorie-confirm-dialog.component';


@Component({
  selector: 'app-add-categorie-dialog',
  templateUrl: './add-categorie-dialog.component.html',
  styleUrls: ['./add-categorie-dialog.component.scss']
})
export class AddCategorieDialogComponent implements OnInit, OnDestroy {

  // VARIABLES
  formControl = this.createForm();
  categorie: Categorie;
  selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');
  dialogRefDeleteCategorie: MatDialogRef<DeleteCategorieConfirmDialogComponent>;
  errorCategorie: string;

  private subscriptons: Subscription[] = [];

  // LIFECYCLEHOOKS
  ngOnDestroy() {
    this.subscriptons.forEach( subscriptions => subscriptions.unsubscribe() );
    this.dialogRef.close();
  }

  ngOnInit() {
    this.subscriptons.push( this.$categorie.getAllCategories().subscribe( ));
  }

  constructor( public dialogRef: MatDialogRef<AddCategorieDialogComponent>,  public $categorie: CategorieService, private $todo: TodoService , public dialog: MatDialog) {}

  // CREATES CATEGORIE
  // - sets sessionStorage for new Categorie
  // - sets Header in TodoHeader
  // - closes the Dialog
  createCategorie() {
    if ( sessionStorage.getItem('x-auth')){
      if ( this.formControl.value.categorie ){
          if ( this.$categorie.categories$.getValue().length < 1) {
              this.createSureCategorie()
          } else {
              for (let categorieItr of this.$categorie.categories$.getValue()) {
                  if ( categorieItr.text === this.formControl.value.categorie) {
                      // Categorie exist
                      this.errorCategorie = "Can´t create categorie (categorie must be unique)"
                  } else {
                      this.createSureCategorie()
                  }
              }
          }
      }
    } else {
      console.log('Please Login')
    }
  }

  createSureCategorie() {
      // Created categorie does not exist
      sessionStorage.setItem('currentSelectedCategorie', this.formControl.value.categorie);
      this.categorie = {
          text: this.formControl.value.categorie
      };
      console.log(this.$categorie.categories$.getValue())


      this.subscriptons.push(this.$categorie.createCategorie( this.categorie ).subscribe( result => {
          console.log( result )
      }) );

      this.dialogRef.close(this.formControl.value.categorie);
  }

  // SETS SESSIONSTORAGE AFTER SELECT
  // - closes the dialog
  // - gets todos for selected categorie
  setCategorieSessionStorage(data) {
    if ( sessionStorage.getItem('x-auth')){

      this.selectedCategorie = data;
      sessionStorage.setItem('currentSelectedCategorie', data);
      this.dialogRef.close( this.selectedCategorie );
    } else {
      console.log('Please Login')
    }
  }

  // DELETES CURRENT CATEGORIE
  // - in DB and sessionStorage
  deleteCurrentCategorie( ) {
    if (this.selectedCategorie) {
      this.dialogRefDeleteCategorie = this.dialog.open(DeleteCategorieConfirmDialogComponent);

      this.dialogRefDeleteCategorie.afterClosed().subscribe( result => {
        if ( result ) {
          this.subscriptons.push(this.$categorie.deleteCategorieById( ).subscribe( () => {
          }));

          this.subscriptons.push( this.$todo.deleteTodosWithCategorie().subscribe( () => {
            this.dialogRef.close();
          }));

          this.subscriptons.push( this.$todo.getAllTodos().subscribe() );
        }
      });
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      categorie: new FormControl()
    });
  }
}
