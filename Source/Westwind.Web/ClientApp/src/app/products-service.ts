import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'authkey',
      'userid': '1'
    })
  };

  constructor(private http : HttpClient) { }

  serviceRoot: string = "http://localhost:5000/";
  sleep: string = "3000";

  getOne(productId: any): Observable<Product> {
    return this.http.get<Product>(`${this.serviceRoot}products/${productId}/${this.sleep}`, this.httpOptions);
  }

  //getOne$ = (productId: any): Observable<Product> => this.http.get<Product>(`${this.serviceRoot}products/${productId}/${this.sleep}`, this.httpOptions);

  getAll(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.serviceRoot}products/${this.sleep}`, this.httpOptions);
  }

  //getAll$ = (): Observable<Array<Product>> => this.http.get<Array<Product>>(`${this.serviceRoot}products/${this.sleep}`, this.httpOptions);

  search(term: string) : Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.serviceRoot}products/search/${term}/${this.sleep}`, this.httpOptions);
  }
  
  add(product) : Observable<Product> {
    return this.http.post<Product>(`${this.serviceRoot}products/${this.sleep}`, product, this.httpOptions);
  }
    
  edit(product): Observable<Product> {
    return this.http.put<Product>(`${this.serviceRoot}products/${this.sleep}`, product, this.httpOptions);
  }

  delete(product): Observable<any> {
    return this.http.delete(`${this.serviceRoot}products/${product.productId}/${this.sleep}`, this.httpOptions);
  }
}
