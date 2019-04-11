import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  //serviceRoot: string = "http://localhost/northwind.web/"; 
  serviceRoot: string = "http://localhost:5000/";

  getAll() {
    return this.http.get(this.serviceRoot + "categories", this.httpOptions);
  }
}
