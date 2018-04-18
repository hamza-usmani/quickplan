import { Injectable } from '@angular/core';
import { Plan } from '../Models/Plan';

@Injectable()
export class SharedService {
  public currentPlan: Plan;

  constructor() {
    this.clearPlan();
   }

   public clearPlan() {
     this.currentPlan = new Plan();
   }
}
