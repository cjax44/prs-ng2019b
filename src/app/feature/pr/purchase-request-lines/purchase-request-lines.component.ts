import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from 'src/app/service/pr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PrliService } from 'src/app/service/prli.service';
import { Prli } from 'src/app/model/prli.class';

@Component({
  selector: 'app-purchase-request-lines',
  templateUrl: './purchase-request-lines.component.html',
  styleUrls: ['./purchase-request-lines.component.css']
})
export class PurchaseRequestLinesComponent implements OnInit {
  title: string = "PR Lines";
  prIdStr: string = '0';
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;
  purchaseRequests: PurchaseRequest[];
  prlis: Prli[];
  prli: Prli;
  prliIdStr: string = '0';
  total: number;

  constructor(private prliSvc: PrliService, private prSvc: PurchaseRequestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // get all prli
    
    this.route.params.subscribe(params => this.prIdStr = params['id']);
    this.route.params.subscribe(params => this.prliIdStr = params[`del`]);

    console.log("prli list prIdStr = "+this.prIdStr);
    this.prliSvc.list(this.prIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prlis = this.jr.data as Prli[];
          console.log(this.prlis);
        }
        else {
          console.log("Error getting purchase requests");
          // implement error handling
        }
      }
      )

    //get prli and set prli str
    console.log("prliIdStr = "+ this.prliIdStr);
    this.prliSvc.get(this.prliIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.prli = this.jr.data as Prli;
    })

      

    //get pr from db
    console.log("get specific pr prIdStr = "+this.prIdStr);
    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
    });

    

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

    if (this.prliIdStr != '0' && this.prliIdStr !=null) {
      this.remove();
    }
   
  }

  remove() {

      this.prliSvc.remove(this.prliIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        this.prli = this.jr.data as Prli;
        this.router.navigate(['/pr/lines/list/'+this.prIdStr]);
      });
  }
}
