import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isAuthenticated = this.authService.getToken();
    if (isAuthenticated && !this.authService.isTokenExpired()) {
      return true; // jika authenticated, lanjutkan ke halaman yang diinginkan
    } else {
      // redirect ke halaman login
      alert('You need to login first');
      this.authService.removeToken();
      return this.router.createUrlTree(['/login'], {
        queryParams: { redirect: state.url },
      });
    }
  }
}
