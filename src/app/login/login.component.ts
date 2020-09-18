import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDetails, User } from '../model';
import { CircularServiceService } from '../circular-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public  username:  string ;
  public  password:  string;
  public currentUser: User;
  ninv = true;
  pinv = true;
  constructor(private router: Router, private circularService: CircularServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  login() {
    this.ninv = true;
    this.pinv = true;
    console.log(this.username);
    console.log(this.password);
    this.currentUser = new User();
    this.currentUser.username = this.username;
    this.currentUser.password = this.password;
    this.circularService.login(this.currentUser).subscribe((result) => {
         console.log(result);
         this.circularService.clientName = result.clientNumber;
         this.circularService.isAdmin = result.isAdmin;
         this.circularService.currentUser = result;
         this.router.navigate(['admin/upload']);
        //  if (result.isAdmin) {
        //   this.router.navigate(['admin/upload']);
        //  } else {
        //   this.router.navigate(['search']);
        //  }
    });

  }

  loginEnter(e) {
    console.log('on enter');
    this.login();
  }

  onKeyUsername() {
    this.ninv = true;
  }

  onKeyPass() {
    this.pinv = true;
  }

  close() {
  }

}
