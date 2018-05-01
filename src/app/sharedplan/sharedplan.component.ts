import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanService } from '../Services/plan.service';
import { SharedPlan } from '../Models/SharedPlan';

@Component({
  selector: 'app-sharedplan',
  templateUrl: './sharedplan.component.html',
  styleUrls: ['./sharedplan.component.css']
})
export class SharedplanComponent implements OnInit{
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

  constructor(private route: ActivatedRoute, private _planService: PlanService) {
    this.route.params.subscribe(params => {
      const uuid = params.uuid;
      this._planService.viewPlan(uuid).subscribe(p => {
        this.sharedPlan = new SharedPlan(p);
      }, (err) => {
          console.log(err.error);
      });
    });
  }

  ngOnInit() {
  }

}
