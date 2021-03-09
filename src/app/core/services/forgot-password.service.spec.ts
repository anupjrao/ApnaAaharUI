import { TestBed } from '@angular/core/testing';
import{HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'
import { ForgotPasswordService } from './forgot-password.service';
import {User} from '../../Models/User';
import {baseURL} from '../../../environments/environment'
describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;
  let httpMock:HttpTestingController;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[ForgotPasswordService]
    });
    service = TestBed.inject(ForgotPasswordService);
    httpMock=TestBed.inject(HttpTestingController);
  });

  it('should be return otp for Gmail', () => {
    let user=new User();
      user.email="johnson44y@gmail.com";
      user.phoneNumber=""
      const dummyData:number=123456;
      service.GetOtp(user).subscribe(res=>{
        expect(res).toEqual(dummyData)
      })
      const url=baseURL;
      const request=httpMock.expectOne(`${url}/Account/SendOtp`);
      expect(request.request.method).toBe('POST');
      request.flush(dummyData)
  });
  it('should be return otp for PhoneNo', () => {
    let user=new User();
      user.email="";
      user.phoneNumber="9876543210"
      const dummyData:number=123456;
      service.GetOtp(user).subscribe(res=>{
        expect(res).toEqual(dummyData)
      })
      const url=baseURL;
      const request=httpMock.expectOne(`${url}/Account/SendOtp`);
      expect(request.request.method).toBe('POST');
      request.flush(dummyData)
  });

  it('should be reset Password return true when password is different', () => {
    let user=new User();
      user.email="johnson44y@gmail.com";
      user.phoneNumber=""
      user.password="Password@123"
      const dummyData:number=123456;
      service.ResetPassword(user).subscribe(res=>{
        expect(res).toBeTruthy()
      })
      const url=baseURL;
      const request=httpMock.expectOne(`${url}/Account/ResetPassword`);
      expect(request.request.method).toBe('POST');
  });

  it('should be reset Password return false if give same password', () => {
    let user=new User();
      user.email="johnson44y@gmail.com";
      user.phoneNumber=""
      user.password="Password@123"
      service.ResetPassword(user).subscribe(res=>{
        expect(res).toBeFalsy()
      })
      const url=baseURL;
      const request=httpMock.expectOne(`${url}/Account/ResetPassword`);
      expect(request.request.method).toBe('POST');
  });
  
});
