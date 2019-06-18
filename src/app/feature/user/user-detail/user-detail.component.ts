import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonResponse } from 'src/app/model/json-response.class';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  title: string = "User Detail";
  userIdStr: string;
  jr: JsonResponse;
  user: User;

  constructor(private userSvc: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //get user from db
    this.route.params.subscribe(params => this.userIdStr = params['id']);
    this.userSvc.get(this.userIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.user = this.jr.data as User;
    });

  }

  remove() {
    this.userSvc.remove(this.user).subscribe(
      jresp => {
        this.jr = jresp;
        this.user = this.jr.data as User;
        this.router.navigate(['/user/list']);
      });
  }

}
