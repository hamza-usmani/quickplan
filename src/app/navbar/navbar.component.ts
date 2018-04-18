import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'QuickPlan';
  isLoggedIn = false;

  constructor(private _authenticationService: AuthenticationService,  private router: Router) {
    this.isLoggedIn = _authenticationService.isLoggedIn();
   }

  ngOnInit() {
  }

  logout() {
    this.router.navigateByUrl('/');
    this._authenticationService.logout();
  }

}
