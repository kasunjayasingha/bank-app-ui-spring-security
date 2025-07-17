import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from "../../services/AuthService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // Call OAuth2 login
  login(): void {
    const state = JSON.stringify({ email: this.model.email }); // optional state to carry email
    this.authService.login();
  }
}
