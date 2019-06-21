import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from 'src/app/service/pr.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';

@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {

  title: string = "Purchase Request List";
  jr: JsonResponse;
  purchaseRequests: PurchaseRequest[];

  constructor(private prSvc: PurchaseRequestService) { }

  ngOnInit() {
    this.prSvc.list().subscribe(
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
  }

}
