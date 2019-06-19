import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Vendor } from 'src/app/model/vendor.class';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {
  title: string = "Vendor-Create";
  jr: JsonResponse;
  vendor: Vendor = new Vendor();

  constructor(private vendorSvc: VendorService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.vendorSvc.create(this.vendor).subscribe(
      jresp => {
        this.jr = jresp;
        //assuming good call
        this.router.navigate(['/vendor/list']);
      }
    )
  }
}
