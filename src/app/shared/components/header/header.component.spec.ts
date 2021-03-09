import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MaterialModule} from '../../../material.module';
import { HeaderComponent } from './header.component';
import { HeaderService } from '../../services/header.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/Models/User';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule],
      declarations: [HeaderComponent],
      providers: [FormBuilder],
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });
  it('should route to admin dashboard',()=>{
    component.user = new User();
    component.user.userRole=0;
    const result = component.redirect();
    expect(result).toBe(1);
  });
  it('should route to farmer dashboard',()=>{
    component.user = new User();
    component.user.userRole=1;
    const result = component.redirect();
    expect(result).toBe(2);
  });
  it('should route to buyer dashboard',()=>{
    component.user = new User();
    component.user.userRole=2;
    const result = component.redirect();
    expect(result).toBe(3);
  });
  it('should route to login',()=>{
    const res = component.routeToLogin();
    expect(res).toBeTrue();
  })
  it('should route to register',()=>{
    const res = component.routeToRegister();
    expect(res).toBeTrue();
  })
  it('should route to update profile',()=>{
    const res = component.updateProfile();
    expect(res).toBeTrue();
  })


});
