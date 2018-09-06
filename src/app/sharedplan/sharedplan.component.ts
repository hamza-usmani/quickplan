import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../Services/plan.service';
import { SharedPlan } from '../Models/SharedPlan';
import { CalendarEvent } from 'calendar-utils';
import { CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from '../whenwhere/whenwhere.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

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
export class SharedplanComponent implements OnInit {
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
  modalRef: NgbModalRef;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalData: {
    date: Date;
    eventsOnDay: CalendarEvent[]
  };

  constructor(private route: ActivatedRoute, private _planService: PlanService, private modal: NgbModal, private router: Router) {
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

  ngOnInit() {
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const eventsonday: CalendarEvent[] = this.sharedPlan.events.filter(c =>  c.start.toLocaleDateString() === date.toLocaleDateString());
    this.modalData = { date: date, eventsOnDay: eventsonday };
    this.modalRef = this.modal.open(this.modalContent, { size: 'lg' });
  }

}
