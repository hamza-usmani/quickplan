import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { environment } from '../../environments/environment';
import { UserProfile } from '../Models/UserProfile';

@Injectable()
export class ProfileService {
  private token: string;

  constructor(private http: HttpClient) { }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'get'|'post', profile?: UserProfile): Observable<any> {
    let base;
    if (method === 'post') {
        base = this.http.post(environment.server + `profile`, profile);
    }
    else {
        base = this.http.get(environment.server + `profile`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    const request = base.pipe(
      map((data: UserProfile) => {
        return data;
      })
    );
    return request;
  }

  public profile(): Observable<any> {
    return this.request('get');
  }

  public newProfile(profile: UserProfile): Observable<any> {
    return this.request('post', profile);
  }

}
