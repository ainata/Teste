import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth();
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean> {
    return this.authService.check().pipe(
      map(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/sign-in']);
        }
        return isAuth;
      }),
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/sign-in']);
        }
      })
    );
  }
}
