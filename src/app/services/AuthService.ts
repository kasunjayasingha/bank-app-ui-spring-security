import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {authConfig} from "../auth/auth.config";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }

  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  hasValidAccessToken() {
    return this.oauthService.hasValidAccessToken();
  }

  getUserRoles(): string[] {
    const accessToken = this.accessToken;
    if (!accessToken) {
      return [];
    }
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      return payload.roles || payload.authorities || [];
    } catch (err) {
      console.error("Invalid JWT", err);
      return [];
    }
  }
}
