import { Injectable } from '@angular/core';
import { JsonResponse } from '../model/json-response.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PurchaseRequest } from '../model/purchase-request.class';
import { Product } from '../model/product.class';
import { Prli } from '../model/prli.class';

@Injectable({
  providedIn: 'root'
})
export class PrliService {

  url: string = "http://localhost:8080/purchase-request-line-items/";

  constructor(private http: HttpClient) {
    
  }

 
  list(id: string): Observable<JsonResponse> {
    return this.http.get(this.url+ "lines-for-pr/" +id) as Observable<JsonResponse>
  }

  get(id: string): Observable<JsonResponse> {
    return this.http.get(this.url+id) as Observable<JsonResponse>
  }

  create(prli: Prli): Observable<JsonResponse> {
    console.log("prli.create...");
    console.log(prli);
      return this.http.post(this.url, prli) as Observable<JsonResponse>;
  }

  edit(prli: Prli): Observable<JsonResponse> {
    console.log("prli.edit...");
      return this.http.put(this.url, prli) as Observable<JsonResponse>;
  }

  remove(id: string): Observable<JsonResponse> {
    console.log("prli.remove...")
    console.log(id);
      return this.http.delete(this.url+id) as Observable<JsonResponse>;
  }

}
