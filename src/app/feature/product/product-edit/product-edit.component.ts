import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from 'src/app/service/vendor.service';
import { Vendor } from 'src/app/model/vendor.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = 'Product Edit';
  jr: JsonResponse;
  product: Product;
  productIdStr: string;
  vendors: Vendor[];

  constructor(private productSvc: ProductService, 
              private router: Router, 
              private route: ActivatedRoute, 
               private vendorSvc: VendorService) { }

  ngOnInit() {
    //get product from db
    this.route.params.subscribe(params => this.productIdStr = params['id']);
    this.productSvc.get(this.productIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.product = this.jr.data as Product;
    });
    // list vendors 
    this.vendorSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        this.vendors = this.jr.data as Vendor[];
      }
    )
  }

  edit() {
    this.productSvc.edit(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        this.product = this.jr.data as Product;
        this.router.navigate(['/product/list']);
      });
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
