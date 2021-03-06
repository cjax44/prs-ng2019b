import { Injectable } from '@angular/core';
import { JsonResponse } from '../model/json-response.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  url: string = "http://localhost:8080/products/";

  constructor(private http: HttpClient) {
    
   }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>
  }

   get(prodId: string): Observable<JsonResponse> {
    return this.http.get(this.url+prodId) as Observable<JsonResponse>
  }

  create(product: Product): Observable<JsonResponse> {
    console.log("productsvc.create...");
      return this.http.post(this.url, product) as Observable<JsonResponse>;
  }

  edit(product: Product): Observable<JsonResponse> {
    console.log("productsvc.edit...");
      return this.http.put(this.url, product) as Observable<JsonResponse>;
  }

  remove(product: Product): Observable<JsonResponse> {
    console.log("productsvc.remove...")
      return this.http.delete(this.url+product.id) as Observable<JsonResponse>;
  }
}