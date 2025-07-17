import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:9000', // Your Spring Auth Server
  redirectUri: window.location.origin + '/login/callback',
  clientId: 'eazypublicclient',
  responseType: 'code',
  scope: 'openid email',
  showDebugInformation: true,
  disableAtHashCheck: false,
  requireHttps: false, // Only for development!
  disablePKCE: false,
};
