import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {
  title: string = "Vendor Edit";
  vendorIdStr: string;
  jr: JsonResponse;
  vendor: Vendor;

  constructor(private vendorSvc: VendorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  //get user from db
  this.route.params.subscribe(params => this.vendorIdStr = params['id']);
  this.vendorSvc.get(this.vendorIdStr).subscribe(jresp => {
    this.jr = jresp;
    this.vendor = this.jr.data as Vendor;
  });

}

edit() {
  this.vendorSvc.edit(this.vendor).subscribe(
    jresp => {
      this.jr = jresp;
      this.vendor = this.jr.data as Vendor;
      this.router.navigate(['/vendor/list']);
    });
}
}
