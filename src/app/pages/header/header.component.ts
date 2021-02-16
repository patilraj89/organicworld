import { Customer } from 'src/app/modals/customer';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { MustMatch } from './register.validator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
// Class to display header
export class HeaderComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) openModal: ElementRef;
  @ViewChild('closeBtnReg', { static: false }) closedRegModl: ElementRef;
 
  isLoggedIn = false;
  invalidCredentials = false;
  user: Customer = {};
  hide;
  emailExists = false;
  message;

  loginForm: FormGroup;
  registerForm: FormGroup;
  searchForm: FormGroup;

  constructor(
    private loginService: LoginRegisterService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.loggedInCheck();
  }

  // Function to check Login is successful and change tabs in the header using sessionStorage item 'token'
  loggedInCheck() {
    if (sessionStorage.getItem('token') !== null) {
      this.isLoggedIn = true;
      console.log('is logged in=',true);
    } else {
      this.isLoggedIn = false;
      console.log('is logged in=',false);
    }
  }

  // Function to create formGroup for Login, Register and Search which are loginForm, registerForm, searchForm respectively.
  // with appropriate formControl for all formGroup and validators have to be included for loginForm and registerForm.
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    this.searchForm = this.fb.group({
      content: [''],
    });
  }

  // Function to navigate to products route 'products/search/' appended with search input
  search(post) {
    if (sessionStorage.getItem('token') === null) {
      this.openModal.nativeElement.click();
    }
    this.route.navigateByUrl('products/search/' + post.content);
  }

  

  //  Function to get user's credential and send to backend for authentication token
  //  store the authentication token in a sessionStorage item 'token' and
  //  if user account is crated get user details using accountService or
  //  else create a user account for registered user using updateAccountDetails in accountService
  //  and store in a sessionStorage item 'user' and navigate to 'products/all'
  logIn(post) {  
    if(this.loginForm.invalid)
      return;    
    this.loginService.login(post).subscribe((data) => {
      console.log("Data access token in login component=",data.access_token);
      sessionStorage.setItem('token', data.access_token);
      this.isLoggedIn = true;
      this.openModal.nativeElement.click();
      this.accountService.getAccountDetails(post.email).subscribe((details) => {
        console.log('inside get account details=',details);
        if (details[0] === undefined) {  
          console.log("User Details=",this.user);        
          this.accountService.addAccountDetails(this.user).subscribe();
          sessionStorage.setItem('user', JSON.stringify(this.user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(details[0]));
        }
      });
      console.log('Products');
      this.route.navigateByUrl('products');
    },error=>{
      console.log(error);
      this.invalidCredentials = true;
    });
  }

  // Function to register an user,intialize user variable and open the login modal
  register(post) {
    console.log('register call');
    if(this.registerForm.invalid)
      return;
    this.user.id =''+Math.floor((Math.random()*100)+1);
    this.user.firstName = post.firstName;
    this.user.lastName = post.lastName;
    this.user.email = post.email;
    this.user.password = post.password;    
    console.log('Register Data=',post);
    delete post.confirmPassword;
    //delete post.firstName;
    //delete post.lastName;
    this.loginService.register(post).subscribe();   
    this.hide = true;
    this.closedRegModl.nativeElement.click();

    
  }

  // Function to clear all sessionStorage  items and reload to landing page
  signOut() {
    sessionStorage.clear();
    location.reload();
  }

  ngOnDestroy(): void {
    $(document.body).removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
}
