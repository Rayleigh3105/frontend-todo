
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import {Todo} from './todo';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class TodoService {

  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>( [] ) ;

  readonly todoEndPoint = environment.endpoint + "todos";

  constructor( private $http: HttpClient) {}

  // Get´s all Todos
  getAllTodos(): Observable<Todo[]>{
      return this.$http.get<Todo[]>( this.todoEndPoint, this.updateXAuthfromSessionStorage() )
      .pipe(
        tap( val => this.todos$.next( val ))
      )
  }

  // Creates Todo
  createTodo( todo : Todo ): Observable<Todo> {

    return this.$http.post<Todo>( this.todoEndPoint, todo, this.updateXAuthfromSessionStorage() )
      .pipe(
        tap( ( todoDB ) => {
          const todoList = [ ... this.todos$.getValue() ];
          this.todos$.next( [ ... todoList, todoDB ]);
          this.getAllTodos();
        })
      );
  }

    // Deletes Todos by ID
    deleteTodoById( todo : Todo): Observable<Todo> {

        return this.$http.delete<Todo>( `${this.todoEndPoint}/${todo._id}`, this.updateXAuthfromSessionStorage())
            .pipe(
                tap( ( ) => {
                    const todoList = [ ... this.todos$.getValue() ]
                    const index = todoList.indexOf( todo );
                    if ( index !== -1 ) {
                        todoList.splice( index, 1 );
                    }
                    this.todos$.next( todoList );
                })
            )
    }

    updateTodo( todo : Todo ): Observable<Todo> {
      return this.$http.patch<Todo>( `${this.todoEndPoint}/${todo._id}`, todo, this.updateXAuthfromSessionStorage())
          .pipe(
              tap( ( todoDB ) => {
                const todoList = [ ... this.todos$.getValue() ];
                let index = todoList.indexOf( todo );
                if ( index !== -1 ){
                  todoList[index] = todoDB;
                }
                this.todos$.next( todoList );
              })
          )
    }

    updateXAuthfromSessionStorage() {
        let headers = {
            'x-auth': sessionStorage.getItem('x-auth')
        };

        let requestOptions = {
            headers: new HttpHeaders(headers)
        };

        return requestOptions;

    }
}
