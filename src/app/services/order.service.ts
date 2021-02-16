import { Order } from './../modals/order';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
// Use 'API_URL' from environment.ts
export class OrderService {
  constructor(private http:HttpClient) {}

  // Function to create a new Order with JWT authentication token
  // and error handling using erro-handler.ts
  addOrders(payload: Order): Observable<any> {
    const tkn = sessionStorage.getItem('token');
    return this.http.get(environment.API_URL+'/orders'+payload,{headers:{'Authorization': 'Bearer '+tkn+ ''}});
  }

  // Function to get all orders of a user using user id with JWT authentication token
  // and error handling using erro-handler.ts
  getOrdersByCustomer(payload: string): Observable<any> {
    const tkn = sessionStorage.getItem('token');
    console.log("CustomerId=",payload);  
    return this.http.get(environment.API_URL+'/orders?customerId='+payload,{headers:{'Authorization': 'Bearer '+tkn+ ''}});
  }
}
