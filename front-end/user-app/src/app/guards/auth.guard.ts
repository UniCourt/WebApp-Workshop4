import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(): boolean {
    let isAuthenticated = this.authService.isAuthenticated();
    console.log(isAuthenticated);
    
    if (isAuthenticated) {
      // User is authenticated, allow access to the route
      return true;
    } else {
      // User is not authenticated, redirect to /login
      this.authService.logout();
      return false; 
    }
  }
}
