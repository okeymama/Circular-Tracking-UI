import { Component, OnInit, Input } from '@angular/core';
import { CircularServiceService } from '../circular-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() logout: string;
  constructor(private circularService: CircularServiceService, private router: Router) { }

  ngOnInit() {

  }

  logoutFunction() {
    console.log('in logout function');
    this.circularService.clientName = undefined;
    this.router.navigate(['']);
  }

}
