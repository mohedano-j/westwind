import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'authkey',
      'userid': '1'
    })
  };

  constructor(private http : HttpClient) { }

  serviceRoot: string = "http://localhost:5000/";

  getAll() : Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.serviceRoot + "categories", this.httpOptions);
  }
}
