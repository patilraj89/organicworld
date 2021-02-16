import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

// class to implement route guard for particular routes
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}

  // Implement 'canActivate' method for Route Guard
  canActivate(): boolean {

    const tkn = sessionStorage.getItem('token');
    if(tkn!==null){
      console.log('i am in canActive() method');
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
  }
}
