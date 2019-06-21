import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';
import { JsonResponse } from 'src/app/model/json-response.class';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  title: string = "User Detail";
  prodIdStr: string;
  jr: JsonResponse;
  product: Product;

  constructor(private productSvc: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //get product from db
    this.route.params.subscribe(params => this.prodIdStr = params['id']);
    this.productSvc.get(this.prodIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.product = this.jr.data as Product;
    });
  }

  remove() {
    this.productSvc.remove(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        this.product = this.jr.data as Product;
        this.router.navigate(['/product/list']);
      });
  }

}
