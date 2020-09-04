import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  divColor = 'a';
  constructor() { }

  ngOnInit() {
  }

  getColor(s) {
    console.log(s);
    this.divColor = s;
  }

}
