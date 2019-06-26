import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/pr.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonResponse } from 'src/app/model/json-response.class';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-purchase-request-approve',
  templateUrl: './purchase-request-approve.component.html',
  styleUrls: ['./purchase-request-approve.component.css']
})
export class PurchaseRequestApproveComponent implements OnInit {
  title: string = "PR Approve";
  purchaseRequest: PurchaseRequest;
  jr: JsonResponse;
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

  approve() {
    this.prSvc.approve(this.purchaseRequest).subscribe(
      jresp => {
        this.jr = jresp;
        //assuming good call
        let pr = this.jr.data as PurchaseRequest;
        this.router.navigate(['/pr/lines/list/'+pr.id]);
      })
    }
    
    reject() {
      this.purchaseRequest.status = "Rejected";
      this.prSvc.edit(this.purchaseRequest).subscribe(
        jresp => {
          this.jr = jresp;
          this.purchaseRequest = this.jr.data as PurchaseRequest;
          this.router.navigate(['/pr/list']);
        });
    }
  }
