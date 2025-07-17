import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './components/contact/contact.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AccountComponent} from '../app/components/account/account.component';
import {BalanceComponent} from '../app/components/balance/balance.component';
import {NoticesComponent} from './components/notices/notices.component';
import {LoansComponent} from './components/loans/loans.component';
import {CardsComponent} from './components/cards/cards.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from "./routeguards/auth.routeguard";
import {LoginCallbackComponent} from "./components/login-callback/login-callback.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginCallbackComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'notices', component: NoticesComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'logout', component: LogoutComponent },
  { path: 'myAccount', component: AccountComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'myBalance', component: BalanceComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'myLoans', component: LoansComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'myCards', component: CardsComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
