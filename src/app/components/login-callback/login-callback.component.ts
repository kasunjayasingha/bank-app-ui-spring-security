import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login-callback',
  template: `<p>Signing you in...</p>`
})
export class LoginCallbackComponent implements OnInit {
  constructor(private oauthService: OAuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    // Handle login redirect and parse the token
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    if (this.oauthService.hasValidAccessToken()) {
      const state = this.oauthService.state || '/dashboard';
      this.router.navigateByUrl(state); // redirect to original page or home
    } else {
      this.router.navigate(['/login']);
    }
  }
}
