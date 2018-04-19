import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AuthenticationService, TokenPayload } from '../Services/authentication.service';
import { PeopleComponent } from '../people/people.component';
import { TheplanComponent } from '../theplan/theplan.component';
import { WhenwhereComponent } from '../whenwhere/whenwhere.component';
import { PlanService } from '../Services/plan.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private _planService: PlanService,
              private _authenticationService: AuthenticationService) { }

  ngOnInit() {
      this.planName =  this._planService.currentPlan.planname;
  }

  ngAfterViewInit() { }

  savePlan() {
    this._planService.clearPlan();
    this._planService.currentPlan.planname = this.planName;
    this.peopleComponent.savePlan();
    this.theplanComponent.savePlan();
    this.whenwhereComponent.savePlan();
  }



  printPlan() {
    console.log('plan: ' + this._planService.currentPlan.planname);
    console.log('text: ' + this._planService.currentPlan.plantext);
    console.log('people: ');
    this._planService.currentPlan.people.forEach(element => {
      console.log(element);
    });
    console.log('events: ');
    this._planService.currentPlan.events.forEach(element => {
      console.log(element);
    });
  }
}
