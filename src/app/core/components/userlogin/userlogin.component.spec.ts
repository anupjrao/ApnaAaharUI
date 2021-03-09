import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserloginComponent } from './userlogin.component';

describe('UserloginComponent', () => {
  let component: UserloginComponent;
  let fixture: ComponentFixture<UserloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserloginComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule,ReactiveFormsModule, FormsModule],
      providers:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy()
  });

  it('Email Validation', () => {
    let email=component.loginForm.controls['email']
    expect(email.valid).toBeFalsy()
    let errors={};
    errors=email.errors;
    expect(errors['required']).toBeTruthy()

    email.setValue("testemail@gmail.com")
    expect(email.valid).toBeTruthy()
  });
  
  it('Password Validation', () => {
    let password=component.loginForm.controls['password']
    expect(password.valid).toBeFalsy();
    let errors={};
    errors=password.errors;
    expect(errors['required']).toBeTruthy();

    password.setValue("Password@123");
    expect(password.valid).toBeTruthy();
  });


});
