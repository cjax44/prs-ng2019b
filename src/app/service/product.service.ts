import { Injectable } from '@angular/core';
import { JsonResponse } from '../model/json-response.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}