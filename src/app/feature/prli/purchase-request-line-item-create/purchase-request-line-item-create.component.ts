import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/pr.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PrliService } from 'src/app/service/prli.service';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Prli } from 'src/app/model/prli.class';

@Component({
  selector: 'app-purchase-request-line-item-create',
  templateUrl: './purchase-request-line-item-create.component.html',
  styleUrls: ['./purchase-request-line-item-create.component.css']
})
export class PurchaseRequestLineItemCreateComponent implements OnInit {
  title: 'Purchase Request Lines Create';
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest = new PurchaseRequest();
  products: Product[] = [];
  product: Product = new Product();
  prli: Prli = new Prli();
  prIdStr: string;
 
  constructor(private productSvc: ProductService, private prSvc: PurchaseRequestService, 
              private prliSvc: PrliService, private sysSvc: SystemService, 
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.sysSvc.data.user.loggedIn) {
      this.purchaseRequest.user = this.sysSvc.data.user.instance;
    } else {
      console.log("User not logged in");
    }

    //get pr from db
    this.route.params.subscribe(params => this.prIdStr = params['id']);
    console.log("pr prdIdStr = "+this.prIdStr);
    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
    });
    console.log("getting pr from db" + this.purchaseRequest);

    // get products for dropdown list
    this.route.params.subscribe(params => this.prIdStr = params['id']);
    console.log("pr prdIdStr = "+this.prIdStr);
    
    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
        this.products = this.jr.data as Product[];
        console.log(this.products);
        }
        else {
          console.log("Error getting products");
          // implement error handling
        }
      }
    )
    
  }

  addToPR() {
    this.prli.purchaseRequest = this.purchaseRequest;
    this.prliSvc.create(this.prli).subscribe(
      jresp => {
        this.jr = jresp;
        //assuming good call
        this.router.navigate(['/pr/lines/list/'+this.prIdStr]);
      }
    )
  }

}
