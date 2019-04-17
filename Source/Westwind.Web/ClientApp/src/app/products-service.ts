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

  serviceRoot: string = "http://localhost:5000/products/";

  getOne(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.serviceRoot}${productId}`, this.httpOptions);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.serviceRoot}`, this.httpOptions);
    //return this.http.get<Product[]>(`${this.serviceRoot}slowly`, this.httpOptions);
  }

  search(term: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.serviceRoot}search/${term}`, this.httpOptions);
  }
  
  add(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.serviceRoot}`, product, this.httpOptions);
  }
    
  edit(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.serviceRoot}`, product, this.httpOptions);
  }

  delete(product: Product): Observable<any> {
    return this.http.delete(`${this.serviceRoot}${product.productId}`, this.httpOptions);
  }
}
