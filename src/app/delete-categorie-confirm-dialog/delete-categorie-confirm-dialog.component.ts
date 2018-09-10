import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-categorie-confirm-dialog',
  templateUrl: './delete-categorie-confirm-dialog.component.html',
  styleUrls: ['./delete-categorie-confirm-dialog.component.scss']
})
export class DeleteCategorieConfirmDialogComponent implements OnInit {

  selectedCategorie = sessionStorage.getItem('currentSelectedCategorie');


  constructor( public dialogRef: MatDialogRef<DeleteCategorieConfirmDialogComponent> ) { }

  ngOnInit() {
  }

  deleteCategorie() {
    this.dialogRef.close(true);
  }
}
