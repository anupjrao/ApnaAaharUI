import { TestBed } from '@angular/core/testing';

import { UserLoginService } from './user-login.service';

import { baseURL } from '../../../environments/environment';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/app/Models/User';

describe('UserloginComponent', () => {
 
  let httpMock: HttpTestingController;
  let service: UserLoginService; 
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserLoginService]
    
    }).compileComponents();
    service = TestBed.inject(UserLoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

 
  it('Should return user details', () => {
    
    let userResponse:User = new User();
     userResponse={ userId: 1,
      userFullName: "John",
      phoneNumber:" 8240353167",
      email: "johndoe@gmail.com",
      location: "Kolkata",
      password: "Ankita0707",
      userRole: 2,
      isDeleted: false,
      authToken: "asfjdtndn",
    };
     let user  = new User();
     user = {
      userId: 1,
      userFullName: "",
      phoneNumber: "",
      email: "johndoe@gmail.com",
      location: "",
      password: "Ankita0707",
      userRole: 0,
      isDeleted: false,
      authToken: ""
     }
    service.authenticate(user).subscribe(data => {
      expect(data).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${baseURL}/Account/Login`);
    expect(req.request.method).toBe('POST');
    req.flush(userResponse);
  })


  it('Should return null', () => {
    
    let userResponse:User = null;
     let user  = new User();
     user = {
      userId: 1,
      userFullName: "",
      phoneNumber: "",
      email: "johndoe@gmail.com",
      location: "",
      password: "Ankita0707",
      userRole: 0,
      isDeleted: false,
      authToken: ""
     }
    service.authenticate(user).subscribe(data => {
      expect(data).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${baseURL}/Account/Login`);
    expect(req.request.method).toBe('POST');
    req.flush(userResponse);
  })

});
