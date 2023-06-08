import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }  // Inject the authentication service and the router

  canActivate(
    next: ActivatedRouteSnapshot,  // The next route in the activation process
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {  // The state snapshot
    return this.authService.userId.pipe(  // Pipe the user ID observable
      map(userId => {  // Map the user ID
        if (userId !== null) {  // If the user ID exists
          return true;  // Return true
        } else {  // If the user ID does not exist
          this.router.navigate(['/homepage']);  // Navigate to the '/homepage' route
          return false;  // Return false
        }
      })
    );
  }
}
