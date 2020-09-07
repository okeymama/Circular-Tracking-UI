import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CircularServiceService } from './circular-service.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private circularService: CircularServiceService,
    private route: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.circularService.clientName) {
        console.log('in auth guard ');
        console.log(this.circularService.clientName);
        return true;
      } else {
        console.log('in auth guard redirect');
        console.log(this.circularService.clientName);
        this.route.navigate(['']);
        return false;
      }
  }
}
