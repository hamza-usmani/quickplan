import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlanService } from '../Services/plan.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  title = 'Name your plan';
  buttonText  = 'Plan';
  planname = '';
  errorMessage: string;
  errorState = false;

  constructor(private router: Router, private _planService: PlanService) {
  }

  ngOnInit() {
  }

  goToHome() {
    if (this.planname === null || this.planname.trim().length === 0) {
      this.showError('You must enter a name for your plan!');
    }
    else {
      this.errorState = false;
      this._planService.currentPlan.planname = this.planname;
      this.router.navigate(['/plan']);
    }
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.errorState = true;
  }
}
