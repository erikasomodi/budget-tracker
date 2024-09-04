import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return combineLatest([
      this.authService.loggedInStatus$,
      this.authService.userRole$
    ]).pipe(
      take(1),
      map(([isLoggedIn, userRole]) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        const expectedRole = route.data['role'];
        if (expectedRole && userRole !== expectedRole) {
          if (userRole === 'admin') {
            this.router.navigate(['/users']);
          } else {
            this.router.navigate(['/home-page']);
          }
          return false;
        }
        return true;
      })
    );
  }
}