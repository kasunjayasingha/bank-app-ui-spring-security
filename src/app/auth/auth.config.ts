import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:9000', // your Spring Authorization Server
  redirectUri: window.location.origin + '/login/callback',
  clientId: 'eazypublicclient',
  responseType: 'code', // required for PKCE
  scope: 'openid email',
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: false,
  requireHttps: false, // allow HTTP for local testing
  disableAtHashCheck: true,
  useSilentRefresh: false,
  disablePKCE: false // ✅ ENABLE PKCE flow
};
