import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { User } from 'src/app/model/user.class';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { PurchaseRequestService } from 'src/app/service/pr.service';

@Component({
  selector: 'app-purchase-request-edit',
  templateUrl: './purchase-request-edit.component.html',
  styleUrls: ['./purchase-request-edit.component.css']
})
export class PurchaseRequestEditComponent implements OnInit {
  title: string = 'Purhcase Request Edit';
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;
  prIdStr: string;
  users: User[];

  constructor(private prSvc: PurchaseRequestService, 
              private router: Router, 
              private route: ActivatedRoute, 
              private userSvc: UserService) { }

  ngOnInit() {
    //get product from db
    this.route.params.subscribe(params => this.prIdStr = params['id']);
    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
    });
    //list users
    this.userSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        this.users = this.jr.data as User[];
      }
    )
  }

  edit() {
    this.prSvc.edit(this.purchaseRequest).subscribe(
      jresp => {
        this.jr = jresp;
        this.purchaseRequest = this.jr.data as PurchaseRequest;
        this.router.navigate(['/pr/list']);
      });
  }
}
