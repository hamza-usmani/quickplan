import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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

  signup() {
    if (!this.credentials.email || !this.credentials.password) {
      this.showError('Both email and password must have values');
    }
    else if (!this.credentials.email.includes('@')) {
      this.showError('Email address must be a valid format.');
    }
    else if (this.credentials.password.length < 6) {
      this.showError('Password must be at least 6 characters.');
    }
    else {
      this.errorState = false;
      this.showSpinner = true;
      console.log(this.credentials.email + ' , ' + this.credentials.password);
      this.register();
    }
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.errorState = true;
  }

  private register() {
    this._authenticationService.register(this.credentials).subscribe(s => {
      this.router.navigateByUrl('/home');
    }, (err) => {
        this.showSpinner = false;
        this.showError(err.error);
    });
  }

}
