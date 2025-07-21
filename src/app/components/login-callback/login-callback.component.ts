import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import {authConfig} from "../../auth/auth.config";
import {AuthService} from "../../services/AuthService";

@Component({
  selector: 'app-login-callback',
  template: `
    <div style="padding: 20px;">
      <h2>PKCE Authentication Flow</h2>
      <p>Processing authentication...</p>
    </div>
  `
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('Login callback initiated - processing PKCE callback');

    // ✅ Process the OAuth2 redirect with code+state
    this.oauthService.configure(authConfig);
    console.log('OAuth service configured with PKCE settings:',
               { responseType: authConfig.responseType, disablePKCE: authConfig.disablePKCE });

    // Check URL parameters to confirm we're in a callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    console.log('URL parameters:', {
      hasCode: !!code,
      hasState: !!state,
      url: window.location.href
    });

    // Process the callback
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log('Discovery document loaded and login attempted');

    // ✅ Once processed, check token validity
    if (this.oauthService.hasValidAccessToken()) {
      console.log('✅ PKCE flow successful! Token is valid.');
      console.log('Access token:', this.oauthService.getAccessToken());

      const claims = this.oauthService.getIdentityClaims();
      console.log('Identity claims:', claims);

      const redirectPath = this.oauthService.state || '/dashboard';
      console.log('Redirecting to:', redirectPath);
      this.router.navigateByUrl(redirectPath);
    } else {
      console.warn('❌ PKCE flow failed - Token not valid');
      console.log('Restarting PKCE flow...');
      this.authService.login();
    }
  }
}
