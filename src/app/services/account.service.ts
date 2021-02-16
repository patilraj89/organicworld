import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../modals/customer';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { ErrorHandler } from '../error-handler';


@Injectable({
  providedIn: 'root',
 })
 // Use 'API_URL' from environment.ts
export class AccountService {
  constructor(
    private http:HttpClient,
    private error:ErrorHandler
  ) {}

  // Function to get User's account details using email with JWT authentication token
  // and error handling using erro-handler.ts
  getAccountDetails(payload: string): Observable<Customer> {
    const tkn = sessionStorage.getItem('token');
    return this.http.get(environment.API_URL+'/customers?email='+payload,{headers:{'Authorization': 'Bearer '+tkn+ ''}});
  }

  // Function to update or create new User's account details with JWT authentication token
  // and error handling using erro-handler.ts
  updateAccountDetails(payload: Customer): Observable<Customer> {
    const tkn = sessionStorage.getItem('token');
    return this.http.put(environment.API_URL+'/customers/:id',payload,{headers:{'Authorization': 'Bearer '+tkn+ ''}});
  }

  // Function to update or create new User's account details with JWT authentication token
  // and error handling using erro-handler.ts
  addAccountDetails(payload: Customer): Observable<any> {    
    const tkn = sessionStorage.getItem('token');
    return this.http.post(environment.API_URL+'/customers',payload,{headers:{'Authorization': 'Bearer '+tkn+ ''}});
  }
}
