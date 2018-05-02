import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../Services/plan.service';
import { SharedPlan } from '../Models/SharedPlan';
import { CalendarEvent } from 'calendar-utils';
import { CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from '../whenwhere/whenwhere.component';

@Component({
  selector: 'app-sharedplan',
  templateUrl: './sharedplan.component.html',
  styleUrls: ['./sharedplan.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class SharedplanComponent {
  sharedPlan = new SharedPlan();
  options: Object = {
    events : {
      'froalaEditor.initialized' : function(e, editor) {
        editor.edit.off();
      }
    },
    toolbarSticky: false,
    toolbarButtons: [],
    quickInsertTags: [],
    charCounterCount: false
  };
  view = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(private route: ActivatedRoute, private _planService: PlanService, private router: Router) {
    this.route.params.subscribe(params => {
      const uuid = params.uuid;
      this._planService.viewPlan(uuid).subscribe(p => {
        this.sharedPlan = new SharedPlan(p);
        if (this.sharedPlan.events) {
          this.viewDate = this.sharedPlan.events[0].start;
        }
      }, (err) => {
          this.router.navigateByUrl('/error');
      });
    });
  }

}
