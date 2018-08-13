import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import {Todo} from './todo';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class TodoService {

  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>( [] ) ;

  readonly todoEndPoint = environment.endpoint + "todos"

  constructor( private $http: HttpClient) {}

  // Get´s all Todos
  getAllTodos(): Observable<Todo[]>{
    return this.$http.get<Todo[]>( this.todoEndPoint )
      .pipe(
        tap( val => this.todos$.next( val ))
      )
  }

  // Deletes Todos by ID
  deleteTodoById( todo : Todo): Observable<any> {
    return this.$http.delete<any>( `${this.todoEndPoint}/${todo._id}`)
      .pipe(
        tap( () => {
          const todoList = [ ... this.todos$.getValue() ]
          const index = todoList.indexOf( todo );
          if ( index !== -1 ) {
            todoList.splice( index, 1 );
          }
          this.todos$.next( todoList );
        })
      )
  }
}
