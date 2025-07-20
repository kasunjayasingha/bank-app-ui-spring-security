import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-pkce-test',
  template: `
    <div class="container mt-5">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h2>PKCE Flow Test</h2>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <h4>Authentication Status</h4>
            <div class="alert" [ngClass]="isAuthenticated ? 'alert-success' : 'alert-warning'">
              <strong>Status:</strong> {{ isAuthenticated ? 'Authenticated ✅' : 'Not Authenticated ❌' }}
            </div>
          </div>

          <div class="mb-4" *ngIf="isAuthenticated">
            <h4>Token Information</h4>
            <div class="form-group">
              <label><strong>Access Token:</strong></label>
              <textarea class="form-control" rows="3" readonly>{{ accessToken }}</textarea>
            </div>

            <div class="mt-3">
              <label><strong>Identity Claims:</strong></label>
              <pre class="border p-3 bg-light">{{ identityClaims | json }}</pre>
            </div>

            <div class="mt-3">
              <label><strong>User Roles:</strong></label>
              <ul class="list-group">
                <li class="list-group-item" *ngFor="let role of userRoles">{{ role }}</li>
                <li class="list-group-item text-muted" *ngIf="userRoles.length === 0">No roles found</li>
              </ul>
            </div>
          </div>

          <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-success" (click)="login()" *ngIf="!isAuthenticated">
              Login with PKCE
            </button>
            <button class="btn btn-warning" (click)="logout()" *ngIf="isAuthenticated">
              Logout
            </button>
            <button class="btn btn-info" (click)="refreshInfo()">
              Refresh Information
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PkceTestComponent implements OnInit {
  isAuthenticated = false;
  accessToken = '';
  identityClaims: any = {};
  userRoles: string[] = [];

  constructor(
    private oauthService: OAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.refreshInfo();
  }

  refreshInfo(): void {
    console.log('Refreshing PKCE test information');
    this.isAuthenticated = this.authService.isAuthenticated();
    this.accessToken = this.authService.accessToken || '';
    this.identityClaims = this.authService.identityClaims || {};
    this.userRoles = this.authService.getUserRoles();

    console.log('Authentication status:', {
      isAuthenticated: this.isAuthenticated,
      hasAccessToken: !!this.accessToken,
      claims: this.identityClaims,
      roles: this.userRoles
    });
  }

  login(): void {
    console.log('Initiating PKCE login flow from test component');
    this.authService.login();
  }

  logout(): void {
    console.log('Logging out from test component');
    this.authService.logout();
    setTimeout(() => this.refreshInfo(), 500);
  }
}
