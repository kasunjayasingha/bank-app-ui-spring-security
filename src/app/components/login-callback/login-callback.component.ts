import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import {authConfig} from "../../auth/auth.config";

@Component({
  selector: 'app-login-callback',
  template: `<p>Signing you in...</p>`
})
export class LoginCallbackComponent implements OnInit {
  constructor(private oauthService: OAuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    // ✅ Process the OAuth2 redirect with code+state
    this.oauthService.configure(authConfig);
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    // ✅ Once processed, check token validity
    if (this.oauthService.hasValidAccessToken()) {
      console.log('Token is valid, redirecting to the application dashboard');
      const redirectPath = this.oauthService.state || '/dashboard';
      this.router.navigateByUrl(redirectPath);
    } else {
      console.warn('Token not valid — restarting login flow');
      this.oauthService.initCodeFlow();
    }
  }
}
