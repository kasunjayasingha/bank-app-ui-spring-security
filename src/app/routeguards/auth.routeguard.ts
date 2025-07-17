import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import {AuthService} from "../services/AuthService";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const hasValidAccessToken = authService.hasValidAccessToken();

  if (!hasValidAccessToken) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRoles = route.data['roles'] as string[];
  if (!requiredRoles || requiredRoles.length === 0) {
    return true; // No roles required
  }



  console.log(`User roles: ${JSON.stringify(authService.getUserRoles())}`);

  const hasRequiredRole = requiredRoles.some(role => authService.getUserRoles().includes(role));
  if (!hasRequiredRole) {
    router.navigate(['/home']); // or show "Access Denied"
    return false;
  }

  return true;
};
