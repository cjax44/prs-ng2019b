import { Component, OnInit, ElementRef } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/pr.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-purchase-request-review',
  templateUrl: './purchase-request-review.component.html',
  styleUrls: ['./purchase-request-review.component.css']
})
export class PurchaseRequestReviewComponent implements OnInit {
  title: string = "Purchase Request List";
  jr: JsonResponse;
  purchaseRequests: PurchaseRequest[];
  user: User;

  constructor(private prSvc: PurchaseRequestService, private sysSvc: SystemService, private elRef: ElementRef) { }

  ngOnInit() {

    this.user = this.sysSvc.data.user.instance;

    if (this.user.reviewer) {
      if (this.sysSvc.data.user.loggedIn) {      
        this.prSvc.review(this.user).subscribe(
          jresp => {
            this.jr = jresp;
            if (this.jr.errors == null) {
            this.purchaseRequests = this.jr.data as PurchaseRequest[];
            console.log(this.purchaseRequests);
            }
            else {
              console.log("Error getting purchase requests");
              // implement error handling
            }
          }
        )
        } else {
          console.log("no user logged in");
        }
      } else {
        console.log("user is not a reviewer")
      }
    }
    

}
