import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {authConfig} from "../auth/auth.config";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService) {
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    // this.oauthService.initLoginFlow();
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (!this.oauthService.hasValidAccessToken()) {
        console.log("Access token is not valid, initiating PKCE login flow");
        this.oauthService.initCodeFlow(); // triggers PKCE login
      }else {
        console.log("Access token is valid, no need to login again");
      }
    });
  }

  logout() {
    this.oauthService.logOut({
      postLogoutRedirectUri: window.location.origin + '/login/callback'
    });
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
      return payload.roles || payload.authority || [];
    } catch (err) {
      console.error("Invalid JWT", err);
      return [];
    }
  }

  getClaims(): string {
    console.log("subject claim:", this.oauthService.getIdentityClaims()?.['sub']);
    return this.oauthService.getIdentityClaims()?.['sub'];
  }
}
