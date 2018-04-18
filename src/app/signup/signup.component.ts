import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../Services/authentication.service';
import { Router } from '@angular/router';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

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
  confirmpassword = '';
  showSpinner = false;
  errorMessage: string;
  errorState = false;
  @Input() modalRef: NgbModalRef = null;

  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.errorState = true;
  }

  signup() {
    if (!this.credentials.email || !this.credentials.password || this.credentials.password.length === 0) {
      this.showError('Both email and password must have values');
    }
    else if (!this.credentials.email.includes('@')) {
      this.showError('Email address must be a valid format.');
    }
    else if (this.credentials.password.length < 6) {
      this.showError('Password must be at least 6 characters.');
    }
    else if (this.credentials.password !== this.confirmpassword) {
      this.showError('Passwords do not match!');
    }
    else {
      this.errorState = false;
      this.showSpinner = true;
      this.register();
    }
  }

  private register() {
    this._authenticationService.register(this.credentials).subscribe(s => {
      if (this.modalRef !== null) {
        this.modalRef.close();
      }
      this.router.navigateByUrl('/profile');
    }, (err) => {
        this.showSpinner = false;
        this.showError(err.error);
    });
  }

}
