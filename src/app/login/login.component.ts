import { AuthService } from '../services/auth.service';
import { LoginData } from './login.data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  data: LoginData = {} as LoginData;

  loginError: string = '';

  onSubmit() {
    this.authService.login(this.data);
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.errorEmitter.subscribe((msg) => {
      this.loginError = msg;
    });
  }
}