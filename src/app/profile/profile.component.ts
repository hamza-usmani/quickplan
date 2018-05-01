import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { AuthenticationService, TokenPayload } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { UserProfile, UserProfilePlans } from '../Models/UserProfile';
import { ProfileService } from '../Services/profile.service';
import { PlanService } from '../Services/plan.service';
import { Plan } from '../Models/Plan';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  profile: UserProfile;
  alertMessage: string;
  errorState: 'none' | 'error' | 'success';
  shareUrl: string;
  modalRef: NgbModalRef;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  refresh: Subject<any> = new Subject();

  constructor(private _authenticationService: AuthenticationService, private _profileService: ProfileService,
              private _planService: PlanService , private router: Router, private modal: NgbModal, location: Location) {
    if (!_authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
    else {
      _profileService.profile().subscribe(p => {
        this.profile = p as UserProfile;
      }, (err) => {
          this.showError(err.error);
      });
    }
  }

  ngOnInit() {
    this.errorState = 'none';
    this._planService.clearPlan();
  }

  deletePlan(plan: UserProfilePlans) {
    this._profileService.deletePlanFromProfile(this.profile, plan).subscribe(p => {
      location.reload();
    }, (err) => {
      this.showError(err.error);
    });
  }

  openPlan(plan: UserProfilePlans) {
    this._planService.getPlan(plan).subscribe(p => {
      this._planService.currentPlan = new Plan(p);
      this.router.navigate(['/plan']);
    }, (err) => {
      this.showError(err.error);
    });
  }

  sharePlan(plan: UserProfilePlans) {
    this._planService.sharePlan(plan).subscribe(p => {
      console.log(p);
      this.shareUrl = location.host + '/plan/view/' + p.uuid;
      this.modalRef = this.modal.open(this.modalContent, { size: 'lg' });
    }, (err) => {
      this.showError(err.error);
    });
  }

  newPlan() {
    this._planService.clearPlan();
    this.router.navigateByUrl('/start');
  }

  copyURL() {

  }

  private showSuccess(message: string) {
    this.alertMessage = message;
    this.errorState = 'success';
  }

  private showError(message: string) {
    this.alertMessage = message;
    this.errorState = 'error';
  }

}
