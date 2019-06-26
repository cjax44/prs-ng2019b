import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from 'src/app/service/pr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { User } from 'src/app/model/user.class';
import { Product } from 'src/app/model/product.class';
import { Prli } from 'src/app/model/prli.class';
import { ProductService } from 'src/app/service/product.service';
import { PrliService } from 'src/app/service/prli.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-purchase-request-line-item-edit',
  templateUrl: './purchase-request-line-item-edit.component.html',
  styleUrls: ['./purchase-request-line-item-edit.component.css']
})
export class PurchaseRequestLineItemEditComponent implements OnInit {
  title: string = 'Purchase Request Edit';
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;
  prIdStr: string;
  users: User[];
  products: Product[] = [];
  product: Product = new Product();
  prli: Prli = new Prli();
  prliIdStr: string;


  constructor(private productSvc: ProductService, private prSvc: PurchaseRequestService, 
    private prliSvc: PrliService, private sysSvc: SystemService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    // if (this.sysSvc.data.user.loggedIn) {
    //   this.purchaseRequest.user = this.sysSvc.data.user.instance;
    // } else {
    //   console.log("User not logged in");
    // }

    //get pr and prli strings from db
    this.route.params.subscribe(params => this.prIdStr = params['id']);
    this.route.params.subscribe(params => this.prliIdStr = params['prli']);
    console.log("pr prdIdStr = "+this.prIdStr);
    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
    });
    console.log("prli prliIdStr = "+this.prliIdStr);
    this.prliSvc.get(this.prliIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.prli = this.jr.data as Prli;
    });

    // get products for dropdown list
    // this.route.params.subscribe(params => this.prIdStr = params['id']);
    // console.log("pr prdIdStr = "+this.prIdStr);
    
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

  edit() {

    this.prliSvc.edit(this.prli).subscribe(
      jresp => {
        this.jr = jresp;
        this.prli = this.jr.data as Prli;
        this.router.navigate(['/pr/lines/list/'+this.prIdStr]);
      });

  }

}
