import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginauthService implements CanActivate {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('UserId'); // ✅ Correct key check

      if (!userId) {
        return true; // ✅ Allow access to `/login`
      } else {
        this.router.navigate(['/dashboard']); // ✅ Redirect to `/dashboard`
        return false;
      }
    }
    return false; // If not in browser, deny access
  }
}
