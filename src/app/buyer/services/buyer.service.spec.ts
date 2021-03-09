import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PasswordModel } from 'src/app/Models/PasswordData';

import {baseURL} from '../../../environments/environment'
import { BuyerService } from './buyer.service';

describe('BuyerService', () => {
  let service: BuyerService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      providers: [BuyerService],
      declarations:[]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BuyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Update Location should return one means added', () => {
    let passwordModel =new PasswordModel();
    passwordModel.currentPassword="chennai";
    passwordModel.currentPassword="Passwor@123";
    passwordModel.newPassword="Password@1234";
    service.UpdateUserLocation(passwordModel).subscribe(data => {
      expect(data).toEqual(1);
    });
    const req = httpMock.expectOne(`${baseURL}/Buyer/UpdateUserLocation`);
    expect(req.request.method).toBe('POST');
  });

  it('Should return zero means not added', () => {
    let passwordModel =new PasswordModel();
    passwordModel.currentPassword="chennai";
    passwordModel.currentPassword="Passwor@123";
    passwordModel.newPassword="Password@1234";
    service.UpdateUserLocation(passwordModel).subscribe(data => {
      expect(data).toEqual(0);
    });
    const req = httpMock.expectOne(`${baseURL}/Buyer/UpdateUserLocation`);
    expect(req.request.method).toBe('POST');
  });

  it('Update Password should return true means Added', () => {
    let passwordModel =new PasswordModel();
    passwordModel.currentPassword="chennai";
    passwordModel.currentPassword="Passwor@123";
    passwordModel.newPassword="Password@1234";
    service.UpdateUserPassword(passwordModel).subscribe(data => {
      expect(data).toBeTruthy();
    });
    const req = httpMock.expectOne(`${baseURL}/Buyer/UpdateUserPassword`);
    expect(req.request.method).toBe('POST');
  });

  it('Update Password should return false means not ddded', () => {
    let passwordModel =new PasswordModel();
    passwordModel.currentPassword="chennai";
    passwordModel.currentPassword="Passwor@123";
    passwordModel.newPassword="Password@1234";
    service.UpdateUserPassword(passwordModel).subscribe(data => {
      expect(data).toBeFalsy();
    });
    const req = httpMock.expectOne(`${baseURL}/Buyer/UpdateUserPassword`);
    expect(req.request.method).toBe('POST');
  });
});
