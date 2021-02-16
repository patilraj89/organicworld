import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '../src/app/pages/header/header.component';
import { LoginRegisterService } from 'src/app/services/login-register.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let fakeLogin: LoginRegisterService;
  const payload = { email: 'bruno@email.com', password: 'bruno' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
    }).compileComponents();
    fakeLogin = TestBed.get(LoginRegisterService);
    fakeLogin.login(payload).subscribe((data) => {
      sessionStorage.setItem('token', data.access_token);
    });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have createForm method', async(() => {
    expect(component.createForm).toBeTruthy();
  }));

  it('should have login method', () => {
    expect(component.logIn).toBeTruthy();
  });

  it('should have register method', () => {
    expect(component.register).toBeTruthy();
  });

  it('should have search method', () => {
    expect(component.search).toBeTruthy();
  });

  it('should have singOut method', () => {
    expect(component.signOut).toBeTruthy();
  });

  it('should have loggedInCheck method', () => {
    expect(component.loggedInCheck).toBeTruthy();
  });

  it('should have loginForm', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('should have registerForm', () => {
    expect(component.registerForm).toBeTruthy();
  });

  it('should have searchForm', () => {
    expect(component.searchForm).toBeTruthy();
  });

  it('loginForm invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('registerForm invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('loginForm email field validity', () => {
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();
  });

  it('registerForm email field validity', () => {
    const email = component.registerForm.controls.email;
    expect(email.valid).toBeFalsy();
  });

  it('loginForm email field validity', async(() => {
    let errors = {};
    const email = component.loginForm.controls.email;
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  }));

  it('registerForm email field validity', async(() => {
    let errors = {};
    const email = component.registerForm.controls.email;
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  }));

  it('login method authentication', () => {
    component.loginForm.controls.email.setValue('bruno@email.com');
    component.loginForm.controls.password.setValue('bruno');
    component.logIn(component.loginForm.value);
    expect(sessionStorage.getItem('token')).toBeTruthy();
  });
});
