import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { UserProfile } from '../Models/UserProfile';
import { ProfileService } from '../Services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: UserProfile;
  errorMessage: string;
  errorState = false;

  constructor(private _authenticationService: AuthenticationService, private _profileService: ProfileService, private router: Router) {
    if (!_authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
    else {
      _profileService.profile().subscribe(p => {
        this.profile = <UserProfile>p;
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
