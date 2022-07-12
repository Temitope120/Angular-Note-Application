import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,

  ) { }

  canActivate(): boolean {
    const userData = sessionStorage.getItem('UserDetails');
   
    if (userData === null) {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}