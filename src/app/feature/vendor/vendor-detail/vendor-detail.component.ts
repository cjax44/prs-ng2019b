import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Vendor } from 'src/app/model/vendor.class';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  title: string = "Vendor Detail";
  vendorIdStr: string;
  jr: JsonResponse;
  vendor: Vendor;

  constructor(private vendorSvc: VendorService, private router: Router, private route: ActivatedRoute) { }
    
  ngOnInit() {
    //get vendor from db
    this.route.params.subscribe(params => this.vendorIdStr = params['id']);
    this.vendorSvc.get(this.vendorIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.vendor = this.jr.data as Vendor;
    });
  }

  remove() {
    this.vendorSvc.remove(this.vendor).subscribe(
      jresp => {
        this.jr = jresp;
        this.vendor = this.jr.data as Vendor;
        this.router.navigate(['/vendor/list']);
      });
  }

}
