import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SharedService } from '../Services/shared.service';
import { AuthenticationService, TokenPayload } from '../Services/authentication.service';
import { PeopleComponent } from '../people/people.component';
import { TheplanComponent } from '../theplan/theplan.component';
import { WhenwhereComponent } from '../whenwhere/whenwhere.component';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit, AfterViewInit {
  @Input() planName: string;
  @ViewChild(PeopleComponent) private peopleComponent: PeopleComponent;
  @ViewChild(TheplanComponent) private theplanComponent: TheplanComponent;
  @ViewChild(WhenwhereComponent) private whenwhereComponent: WhenwhereComponent;

  constructor(private route: ActivatedRoute, private router: Router, private _sharedService: SharedService,
              private _authenticationService: AuthenticationService) { }

  ngOnInit() {
      this.planName =  this._sharedService.currentPlan.planname;
  }

  ngAfterViewInit() { }

  savePlan() {
    this._sharedService.clearPlan();
    this._sharedService.currentPlan.planname = this.planName;
    this.peopleComponent.savePlan();
    this.theplanComponent.savePlan();
    this.whenwhereComponent.savePlan();
    // this._authenticationService.savePlan(this._sharedService.currentPlan);
  }

  printPlan() {
    console.log('plan: ' + this._sharedService.currentPlan.planname);
    console.log('text: ' + this._sharedService.currentPlan.plantext);
    console.log('people: ');
    this._sharedService.currentPlan.people.forEach(element => {
      console.log(element);
    });
    console.log('events: ');
    this._sharedService.currentPlan.events.forEach(element => {
      console.log(element);
    });
  }
}
