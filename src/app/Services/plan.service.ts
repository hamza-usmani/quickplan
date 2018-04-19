import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { environment } from '../../environments/environment';
import { Plan } from '../Models/Plan';

@Injectable()
export class PlanService {
  public currentPlan: Plan;

  constructor() {
    this.clearPlan();
   }

   public clearPlan() {
     this.currentPlan = new Plan();
   }

}
