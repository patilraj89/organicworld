import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { ErrorHandler } from '../error-handler';
import { map } from 'jquery';
@Injectable({
  providedIn: 'root',
})
// Use 'API_URL' from environment.ts
export class LoginRegisterService {
  constructor(
    private http:HttpClient,
    private error:ErrorHandler
  ) {}

  // Function to send login data to the backend
  // and error handling using erro-handler.ts
  login(payload: object): Observable<any> {
    return this.http.post(environment.API_URL+'/auth/login',payload);
  }

  // Function to send register data to the backend
  // and error handling using erro-handler.ts
  register(payload: object): Observable<any> {
      console.log("Register=",payload);
    return this.http.post(environment.API_URL+'/auth/register',payload);
  }
}
