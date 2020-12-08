import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { auth, User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public isAdmin: boolean;
  
  constructor(private authService: AuthService, private router: Router) {
    }
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated() && this.authService.isAdmin) {
      return true;
    } 
      return this.router.parseUrl('/login');
    }



    

}


  

  

