import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/service/vendor.service';
import { Vendor } from 'src/app/model/vendor.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title: 'Product Create';
  jr: JsonResponse;
  product: Product = new Product();
  vendors: Vendor[];

  constructor(private productSvc: ProductService, private vendorSvc: VendorService, private router: Router) { }

  ngOnInit() {
    this.vendorSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        this.vendors = this.jr.data as Vendor[];
      }
    )

  }

  create() {
    this.productSvc.create(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        //assuming good call
        this.router.navigate(['/product/list']);
      }
    )
  }

}
