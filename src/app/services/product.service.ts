import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../modals/product';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
// Use 'API_URL' from environment.ts
export class ProductService {
  constructor(
    private http:HttpClient,

  ) {}

  // Function to get all products available with JWT authentication token
  // and error handling using erro-handler.ts
  getAllProducts(): Observable<any> {
    const tkn = sessionStorage.getItem('token');
    console.log('products all token=',tkn);
    return this.http.get(environment.API_URL+'/products',{headers:{'Authorization': 'Bearer '+tkn+''}});
  }

  // Function to get all products of particular category with JWT authentication token
  // and error handling using erro-handler.ts
  getProductsByCategory(payload: string): Observable<any> {
    const tkn = sessionStorage.getItem('token');
    return this.http.get(environment.API_URL+'/products/search/'+payload+'',{headers:{'Authorization': 'Bearer '+tkn+''}});
  }
}
