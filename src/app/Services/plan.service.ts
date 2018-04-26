import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { environment } from '../../environments/environment';
import { Plan } from '../Models/Plan';
import { UserProfilePlans } from '../Models/UserProfile';
import { CalendarEvent } from 'calendar-utils';

@Injectable()
export class PlanService {
  public currentPlan: Plan;
  private token: string;

  constructor(private http: HttpClient) {
    this.clearPlan();
  }

   private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private requestPost(plan: Plan): Observable<any> {
    const base = this.http.post(environment.server + `plan`, plan, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    const request = base.pipe(
      map((data: Plan) => {
        return data;
      })
    );
    return request;
  }

  private requestPut(plan: Plan): Observable<any> {
    const base = this.http.put(environment.server + `plan`, plan, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    const request = base.pipe(
      map((data: Plan) => {
        return data;
      })
    );
    return request;
  }

  private requestGet(plan: UserProfilePlans): Observable<any> {
    const base = this.http.get(environment.server + `plan/${plan.planid}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    const request = base.pipe(
      map((data: Plan) => {
        return data;
      })
    );
    return request;
  }

   public clearPlan() {
     this.currentPlan = new Plan();
   }

   public saveNewPlan(): Observable<any> {
    return this.requestPost(this.currentPlan);
   }

   public saveExistingPlan(): Observable<any> {
    return this.requestPut(this.currentPlan);
   }

   public getPlan(plan: UserProfilePlans): Observable<any> {
    return this.requestGet(plan);
   }

}
