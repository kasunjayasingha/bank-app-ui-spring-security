import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from "../../services/AuthService";
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  template:  `
    <div style="padding: 20px;">
    <h2>Login</h2>
      <p >Processing authentication...</p>
    </div>
  `
})
export class LoginComponent implements OnInit {
  model = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService
  ) {}

  ngOnInit(): void {
    this.login();
  }

  // Call OAuth2 login
  login(): void {
    const state = JSON.stringify({ email: this.model.email }); // optional state to carry email
    this.authService.login();
  }

  // Test PKCE Flow
  testPKCE(): void {
    console.log('Testing PKCE flow...');

    // Check if we already have a valid token
    if (this.oauthService.hasValidAccessToken()) {
      console.log('Already have a valid access token:', this.oauthService.getAccessToken());
      console.log('Token claims:', this.oauthService.getIdentityClaims());

      // Log out first to force a new PKCE flow
      console.log('Logging out to test a fresh PKCE flow...');
      this.oauthService.logOut();
      setTimeout(() => {
        console.log('Starting PKCE flow after logout...');
        this.authService.login();
      }, 1000);
    } else {
      console.log('No valid token found, starting PKCE flow...');
      this.authService.login();
    }
  }
}
