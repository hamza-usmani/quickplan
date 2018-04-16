import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  showSpinner = false;
  errorMessage: string;
  errorState = false;

  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.errorState = true;
  }

  login() {
    if (!this.credentials.email || !this.credentials.password) {
      this.showError('Both email and password must have values');
    }
    else if (!this.credentials.email.includes('@')) {
      this.showError('Email address must be a valid format.');
    }
    else {
      this.errorState = false;
      this.showSpinner = true;
      this.postLogin();
    }
  }

  postLogin() {
    this._authenticationService.login(this.credentials).subscribe(s => {
      this.router.navigateByUrl('/home');
    }, (err) => {
        this.showSpinner = false;
        this.showError(err.error);
    });
  }

}
