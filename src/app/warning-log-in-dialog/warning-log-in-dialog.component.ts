import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-warning-log-in-dialog',
  templateUrl: './warning-log-in-dialog.component.html',
  styleUrls: ['./warning-log-in-dialog.component.scss']
})
export class WarningLogInDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<WarningLogInDialogComponent>) { }

  ngOnInit() {
  }

  login() {
    this.dialogRef.close(true);
  }

}
