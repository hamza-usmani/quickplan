import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { environment } from '../../environments/environment';
import { Plan } from '../Models/Plan';
import { UserProfilePlans } from '../Models/UserProfile';
import { CalendarEvent } from 'calendar-utils';
import { SharedPlan } from '../Models/SharedPlan';

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

  private requestShare(plan: UserProfilePlans): Observable<any> {
    const base = this.http.get(environment.server + `plan/${plan.planid}/getShareLink`,
                    { headers: { Authorization: `Bearer ${this.getToken()}` }});
    const request = base.pipe(
      map((data: Plan) => {
        return data;
      })
    );
    return request;
  }

  private requestView(uuid: string): Observable<any> {
    console.log('UUID is ' + uuid);
    const base = this.http.get('https://' + environment.server + `shared/view/${uuid}`);
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

   public sharePlan(plan: UserProfilePlans): Observable<any> {
    return this.requestShare(plan);
   }

   public viewPlan(uuid: string): Observable<any> {
    return this.requestView(uuid);
   }

}
