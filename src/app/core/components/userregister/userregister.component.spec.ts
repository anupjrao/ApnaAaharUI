import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserregisterComponent } from './userregister.component';
import { UserregisterService } from '../../services/userregister.service';
import { User } from '../../../Models/User';
import { FormBuilder } from '@angular/forms';
import { baseURL } from '../../../../environments/environment';
import { FarmerDetails } from 'src/app/Models/FarmerDetails';
import { CommunityDetails } from 'src/app/Models/CommunityDetails';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserregisterComponent', () => {
  let component: UserregisterComponent;
  let fixture: ComponentFixture<UserregisterComponent>;
  let service: UserregisterService;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserregisterService,FormBuilder],
      declarations: [ UserregisterComponent ]
    }).compileComponents();
    service = TestBed.inject(UserregisterService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UserregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit()
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should validate form', ()=>{
    const res = component.setRadio('Community');
    expect(component.signUpForm.valid).toBeFalsy();
  })
  it('should create farmer details', ()=>{
    let user:FarmerDetails;
    user = new FarmerDetails(); 
    const result = component.createUserData();
    expect(user).not.toBeNull();
  })
  it('should create user details', ()=>{
    let user:User;
    component.signUpForm.controls.userRole.setValue(1);
    user = new User(); 
    const result = component.createUserData();
    expect(user).not.toBeNull();
  })

  it('should reset form', ()=>{
    const res = component.resetForm();
    expect(component.response).toBe('');
  })

  it('should return name error', ()=>{
    component.signUpForm.controls.fullName.setValue('1234ABCD');
    const res = component.getNameError();
    expect(res).toBe('Name should be between 3-30 characters');
  })
  it('should return mobile error',()=>{
    component.signUpForm.controls.mobileNumber.setValue('abcd');
    const res = component.getMobileError();
    expect(res).toBe('Mobile number should be 10 digits with valid number');
  })
  it('should validate email',()=>{
    component.signUpForm.controls.emailId.setValue('abc@gmial.com');
    const res = component.getEmailError();
    expect(res).toBe('Email is required');
  })
  it('shouldValidateFarmerId',()=>{
    const res = component.getFarmerIdError();
    expect(res).toBe('Farmer Id is required');
  });

  it('should validate location',()=>{
    component.signUpForm.controls.location.setValue('12332');
    const res = component.getLocationError();
    expect(res).toBe('Location should be atleast three characters');
  })

  it('should validate community name',()=>{
    component.signUpForm.controls.communityName.setValue('v');
    const res = component.getCommunityNameError();
    expect(res).toBe('Community Name is required');
  })

  it('should password',()=>{
    component.signUpForm.controls.emailId.setValue('a');
    const res = component.getPasswordError();
    expect(res).toBe('Password is required');
  })
});
