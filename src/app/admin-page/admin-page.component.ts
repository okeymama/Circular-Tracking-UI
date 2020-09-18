import { Component, OnInit } from '@angular/core';
import { CircularServiceService } from '../circular-service.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  divColor = 'a';
  username;
  constructor(private circularService: CircularServiceService) { }

  ngOnInit() {
    this.username = this.circularService.currentUser.firstName + ' ' + this.circularService.currentUser.lastName;
  }

  getColor(s) {
    console.log(s);
    this.divColor = s;
  }

}
