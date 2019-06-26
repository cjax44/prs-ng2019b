import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from 'src/app/service/pr.service';
import { Router } from '@angular/router';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-purchase-request-create',
  templateUrl: './purchase-request-create.component.html',
  styleUrls: ['./purchase-request-create.component.css']
})
export class PurchaseRequestCreateComponent implements OnInit {
  title: 'Purchase Request Create';
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest = new PurchaseRequest();
  prIdStr: string;
 

  constructor(private prSvc: PurchaseRequestService, private sysSvc: SystemService, private router: Router) { }

  ngOnInit() {

    if (this.sysSvc.data.user.loggedIn) {
      this.purchaseRequest.user = this.sysSvc.data.user.instance;
    } else {
      console.log("User not logged in");
    }

  }

  create() {
    this.prSvc.create(this.purchaseRequest).subscribe(
      jresp => {
        this.jr = jresp;
        //assuming good call
        let pr = this.jr.data as PurchaseRequest;
        this.router.navigate(['/pr/lines/list/'+pr.id]);
      }
    )
  }
 
}
