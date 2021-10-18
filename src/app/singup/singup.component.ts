import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SignupData } from './signup.data';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  data: SignupData = {} as SignupData;

  signupError: string = '';

  onSubmit() {
    this.authService.signup(this.data);
  }

  constructor(private authService: AuthService) {
    this.authService.errorEmitter.subscribe((msg) => (this.signupError = msg));
  }

  ngOnInit(): void {
  }

}
