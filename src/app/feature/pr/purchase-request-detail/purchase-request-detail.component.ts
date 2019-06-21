import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/pr.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-request-detail',
  templateUrl: './purchase-request-detail.component.html',
  styleUrls: ['./purchase-request-detail.component.css']
})
export class PurchaseRequestDetailComponent implements OnInit {
  title: string = "User Detail";
  prodIdStr: string;
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;
  
  constructor(private prSvc: PurchaseRequestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //get pr from db
    this.route.params.subscribe(params => this.prodIdStr = params['id']);
    this.prSvc.get(this.prodIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
    });
  }

  remove() {
    this.prSvc.remove(this.purchaseRequest).subscribe(
      jresp => {
        this.jr = jresp;
        this.purchaseRequest = this.jr.data as PurchaseRequest;
        this.router.navigate(['/pr/list']);
      });
  }

}
