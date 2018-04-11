import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharedService {

  constructor(private http: HttpClient) { }

  getJWT() {
    this.http.get('http://localhost:3000/users').subscribe(s => console.log(s));
  }

  postJWT(email: string, password: string) {
    this.http.post('http://localhost:3000/users', { 'email': email, 'password': password}).subscribe(s => console.log('done post'));
  }

  printJWT() {
    const id = localStorage.getItem('idToken');
    const expiration = localStorage.getItem('expiresIn');
    const expiresAt = JSON.parse(expiration);
    return { id, expiresAt };
  }
}
