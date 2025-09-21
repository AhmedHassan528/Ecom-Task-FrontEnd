import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthServciesService } from '../services/AuthServices/auth-servcies.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthServciesService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.checkAdmin().pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          // Redirect to unauthorized page or home page
          this.router.navigate(['/products']);
          return false;
        }
      }),
      catchError(() => {
        // If there's an error checking admin status, redirect to home
        this.router.navigate(['/products']);
        return of(false);
      })
    );
  }
}
