import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Categorie} from './categorie';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  categories$: BehaviorSubject<Categorie[]> = new BehaviorSubject<Categorie[]>( [] );

  readonly  categorieEndpoint = environment.endpoint + "categorie";

  constructor( private $http: HttpClient) { }

  getAllCategories(): Observable<Categorie[]> {
    return this.$http.get<Categorie[]>( this.categorieEndpoint, this.updateXAuthfromSessionStorage() )
      .pipe(
        tap( val => this.categories$.next( val ) )
      )
  }

  // Create Categorie
  createCategorie( categorie: Categorie ): Observable<Categorie> {
    return this.$http.post<Categorie>( this.categorieEndpoint, categorie, this.updateXAuthfromSessionStorage() )
      .pipe(
        tap( ( categorieDB ) => {
          const categorieList = [ ... this.categories$.getValue() ];
          this.categories$.next( [ ... categorieList, categorieDB ] );
          this.getAllCategories();
        })
      )
  }

  deleteCategorieById( categorie: Categorie ): Observable<Categorie> {
    return this.$http.delete<Categorie>( `${this.categorieEndpoint}/${categorie._id}`, this.updateXAuthfromSessionStorage() )
      .pipe(
        tap( ( ) => {
          const categorieList = [ ... this.categories$.getValue() ];
          const index = categorieList.indexOf( categorie );
          if ( index !== -1 ){
            categorieList.splice( index, 1 );
          }
          this.categories$.next( categorieList );
        })
      )
  }

  updateCategorieById( categorie: Categorie ): Observable<Categorie> {
    return this.$http.patch<Categorie>( `${this.categorieEndpoint}/${categorie._id}`,categorie, this.updateXAuthfromSessionStorage() )
      .pipe(
        tap( ( categorieDB ) => {
          const categorieList = [ ... this.categories$.getValue() ];
          let index = categorieList.indexOf( categorie );
          if ( index !== -1 ){
            categorieList[index] = categorieDB;
          }
          this.categories$.next( categorieList );
        })
      )
  }

  updateXAuthfromSessionStorage() {
    let headers = {
      'x-categorie': sessionStorage.getItem('currentSelectedCategorie'),
      'x-auth': sessionStorage.getItem('x-auth')
    };

    let requestOptions = {
      headers: new HttpHeaders(headers)
    };

    return requestOptions;

  }
}
