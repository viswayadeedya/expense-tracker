import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('UserId')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
