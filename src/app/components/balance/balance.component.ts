import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {AuthService} from "../../services/AuthService";


@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  user = new User();
  transactions = new Array();
  email = "";

  constructor(private dashboardService: DashboardService, private authService: AuthService) { }

  ngOnInit(): void {
    this.email = this.authService.getClaims();
    if(this.email){
      this.dashboardService.getAccountTransactions(this.email).subscribe(
        responseData => {
        this.transactions = <any> responseData.body;
        });
    }
  }

}
