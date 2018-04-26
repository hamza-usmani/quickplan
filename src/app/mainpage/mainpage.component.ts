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
  @Input() planName = '';
  @ViewChild(PeopleComponent) private peopleComponent: PeopleComponent;
  @ViewChild(TheplanComponent) private theplanComponent: TheplanComponent;
  @ViewChild(WhenwhereComponent) private whenwhereComponent: WhenwhereComponent;

  constructor(private route: ActivatedRoute, private router: Router, private _planService: PlanService,
              private _authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    if (this._planService.currentPlan.planname) {
      this.planName =  this._planService.currentPlan.planname;
    }
    else {
      this.planName = 'Untitled';
    }
  }

  ngAfterViewInit() { }

  savePlanClicked() {
    if (!this._authenticationService.isLoggedIn()) {
      // show modal to sign up or login, then save
      console.log('sign up or login to save');
    }
    else {
      this.savePlan();
    }
  }

  private savePlan() {
    this._planService.currentPlan.planname = this.planName;
      this.peopleComponent.savePlan();
      this.theplanComponent.savePlan();
      this.whenwhereComponent.savePlan();

      // existing plan being updated
      if (this._planService.currentPlan.planid) {
        if (this._planService.currentPlan.userid.toString() == this._authenticationService.getUserDetails()._id) {
            console.log('updating existing plan');
            this.putExistingPlan();
        }
        else {
          console.log('Not authorized. Plan user: ' + this._authenticationService.getUserDetails()._id  +
                    ' and Logged in: ' + this._planService.currentPlan.userid.toString());
        }
      }
      // new plan being posted
      else {
        console.log('post new plan');
        this.postNewPlan();
      }
  }

  private postNewPlan() {
    this._planService.saveNewPlan().subscribe(s => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
        console.log('error saving');
    });
  }

  private putExistingPlan() {
    this._planService.saveExistingPlan().subscribe(s => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
        console.log('error saving');
    });
  }

}
