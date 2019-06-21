import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { JsonResponse } from 'src/app/model/json-response.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  message: string = '';
  user: User = new User();
  jr: JsonResponse;

  constructor(private userSvc: UserService, private sysSvc: SystemService, private router: Router) { }

  ngOnInit() {
    console.log("login called");
    // DEFAULTING FOR TESTING PURPOSES
    
    
  }

  login() {
    this.userSvc.login(this.user).subscribe(
      jresp => {
        this.jr = jresp;
        if(this.jr.errors == null) {
          this.user = this.jr.data as User;
          this.sysSvc.data.user.instance = this.user;
          this.sysSvc.data.user.loggedIn = true;
          this.router.navigateByUrl("/user/list");
        }
        else {
          this.message = "Invalid username or password. Please try again."
        }
      }
    )
  }

}
