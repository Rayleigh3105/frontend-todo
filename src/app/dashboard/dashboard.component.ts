import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( public $todo: TodoService) { }

  ngOnInit() {
  }

}
