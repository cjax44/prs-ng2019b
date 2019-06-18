import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productSvc: ProductService) { }

  title: string = "Product List";
  jr: JsonResponse;
  products: Product[];

  ngOnInit() {
    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
        this.products = this.jr.data as Product[];
        console.log(this.products);
        }
        else {
          console.log("Error getting users");
          // implement error handling
        }
      }
    )
  }

}
