import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NoticesComponent } from './components/notices/notices.component';
import { AccountComponent } from './components/account/account.component';
import { BalanceComponent } from './components/balance/balance.component';
import { LoansComponent } from './components/loans/loans.component';
import { CardsComponent } from './components/cards/cards.component';
import { HomeComponent } from './components/home/home.component';

// OAuth2
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';

export function initializeAuth(oauthService: OAuthService): () => Promise<void> {
  return async () => {
    oauthService.configure(authConfig);
    await oauthService.loadDiscoveryDocumentAndTryLogin();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    NoticesComponent,
    AccountComponent,
    BalanceComponent,
    LoansComponent,
    CardsComponent,
    HomeComponent,
    LoginCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8080'], // backend API base
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    OAuthService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeAuth,
    //   deps: [OAuthService],
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
