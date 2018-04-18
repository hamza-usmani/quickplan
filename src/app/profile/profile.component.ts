import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../Models/UserProfile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: UserProfile;
  errorMessage: string;
  errorState = false;

  constructor(private _authenticationService: AuthenticationService,  private router: Router) {
    if (!_authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
    else {
      _authenticationService.profile().subscribe(s => {
        this.profile = <UserProfile>s;
      }, (err) => {
          this.showError(err.error);
      });
    }
  }

  ngOnInit() {

  }

  private showError(message: string) {
    this.errorMessage = message;
    this.errorState = true;
  }

}
