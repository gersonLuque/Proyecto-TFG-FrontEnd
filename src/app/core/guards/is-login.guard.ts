import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {map} from 'rxjs';

export const isLoginGuard: CanMatchFn = (route, segments) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    map((user) => {
      const isLoggedIn = Boolean(user);
      return isLoggedIn || router.createUrlTree(['auth/login']);
    })
  );
};
