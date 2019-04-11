import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getAll() {
    return this.http.get(this.serviceRoot + "products", this.httpOptions);
  }

  find(query: string) {
    return this.http.get(this.serviceRoot + "products/find/" + query, this.httpOptions);
  }

  getOne(productId: any) {
    return this.http.get(this.serviceRoot + "products/" + productId, this.httpOptions);
  }

  add(productName, categoryId) : Observable<any> {

    let product = {
      productName: productName,
      categoryId: categoryId
    }

    return this.http.post(this.serviceRoot + "products", product, this.httpOptions);
  }
    
  edit(productId, productName, categoryId) : Observable<any> {

    let product = {
      productId: productId,
      productName: productName,
      categoryId: categoryId
    }

    return this.http.put(this.serviceRoot + "products", product, this.httpOptions);
  }
}
