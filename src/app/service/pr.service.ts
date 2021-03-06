import { Injectable } from '@angular/core';
import { JsonResponse } from '../model/json-response.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PurchaseRequest } from '../model/purchase-request.class';
import { User } from '../model/user.class';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {
  
  url: string = "http://localhost:8080/purchase-requests/";

  constructor(private http: HttpClient) {
    
   }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>
  }

  get(prId: string): Observable<JsonResponse> {
    return this.http.get(this.url+prId) as Observable<JsonResponse>
  }

  create(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    console.log("prsvc.create...");
    purchaseRequest.submittedDate = new Date();
    purchaseRequest.status = "New";
      return this.http.post(this.url, purchaseRequest) as Observable<JsonResponse>;
  }

  edit(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    console.log("prsvc.edit...");
      return this.http.put(this.url, purchaseRequest) as Observable<JsonResponse>;
  }

  remove(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    console.log("prsvc.remove...");
      return this.http.delete(this.url+purchaseRequest.id) as Observable<JsonResponse>;
  }

  review(user: User): Observable<JsonResponse> {
    return this.http.get(this.url+"list-review/"+user.id) as Observable<JsonResponse>
  }

  submitForReview(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    console.log("prsvc.submitForReview");
    return this.http.put(this.url+"submit-review", purchaseRequest) as Observable<JsonResponse>;

  }

  approve(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    console.log("prsvc.approve");
    return this.http.put(this.url+"approve", purchaseRequest) as Observable<JsonResponse>;
  }
}