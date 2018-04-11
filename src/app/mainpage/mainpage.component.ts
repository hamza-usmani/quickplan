import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  title: string;

  constructor(private route: ActivatedRoute, private router: Router, private _sharedService: SharedService) { }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.name)
      .subscribe(params => {
        this.title = params.name;
      });
  }

  getJWT() {
    this._sharedService.getJWT();
  }

  postJWT() {
    this._sharedService.postJWT('hamza@email.com', 'temppass');
  }

  printJWT() {
    const id = localStorage.getItem('idToken');
    const expiration = localStorage.getItem('expiresIn');
    const expiresAt = JSON.parse(expiration);
    console.log(id + 'and expiry: ' + expiresAt);
  }
}
