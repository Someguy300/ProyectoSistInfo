import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean 
    | UrlTree> 
    | Promise<boolean 
    | UrlTree> 
    | boolean | UrlTree {
      if(this.authService.isAuthenticated() && !this.authService.isAdmin()){
        return this.router.parseUrl('');
      }else if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
        return true;
      }
      return this.router.parseUrl('/login');
    
  }
  
}