import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../../Models/User';
import { baseURL } from '../../../environments/environment';
import { FarmerDetails } from 'src/app/Models/FarmerDetails';
import { CommunityDetails } from 'src/app/Models/CommunityDetails';

import { UserregisterService } from './userregister.service';

describe('UserregisterService', () => {
  let service: UserregisterService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      providers: [UserregisterService],
      declarations:[]});
    service = TestBed.inject(UserregisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return true if user data added',()=>{
    let isAdded:boolean=true;
  let userData=new User();
  userData.userFullName="john";
  userData.phoneNumber="8976787678";
  userData.email="abc@gmail.com";
  userData.location="hyderabad";
  userData.password="3460a0fa36ba463ea5383717841e045a";
  userData.userRole=2;
    service.addUser(userData).subscribe(data=>{
      expect(data).toBe(isAdded);
    });
    const req = httpMock.expectOne(`${baseURL}/User/AddUser`);
    expect(req.request.method).toBe('POST');
  });

  it('should return false if user data not added',()=>{
    let isAdded:boolean=false;
    let userData=new User();
    userData.userFullName="smith";
    userData.phoneNumber="7076787678";
    userData.email="smith@gmail.com";
    userData.location="hyderabad";
    userData.password="3460a0fa36ba463ea5383717841e045a";
    userData.userRole=2;
    service.addUser(userData).subscribe(data=>{
      expect(data).toBe(isAdded);
    });
    const req = httpMock.expectOne(`${baseURL}/User/AddUser`);
    expect(req.request.method).toBe('POST');
  });

  it('should return successful if farmer community data added',()=>{
    let message:string="Succesfull";
    let farmerData=new FarmerDetails();
    let communityData=new CommunityDetails();
    communityData.CommunityName="remotecommunity";
    let userData=new User();
    userData.userFullName="clary";
    userData.phoneNumber="7976787678";
    userData.email="clary@gmail.com";
    userData.location="hyderabad";
    userData.password="3460a0fa36ba463ea5383717841e045a";
    userData.userRole=1;
    farmerData.user=userData;
    farmerData.community=communityData;
    service.addFarmer(farmerData).subscribe(data=>{
      expect(data).toEqual(message);
    });
    const req = httpMock.expectOne(`${baseURL}/Farmer/AddFarmer`);
    expect(req.request.method).toBe('POST');
  });

  it('should return duplication if farmer community data is invalid',()=>{
    let message:string="Duplication";
    let farmerData=new FarmerDetails();
    let communityData=new CommunityDetails();
    communityData.CommunityName="localcommunity";
    let userData=new User();
    userData.userFullName="mike";
    userData.phoneNumber="9971237678";
    userData.email="mike@gmail.com";
    userData.location="hyderabad";
    userData.password="3460a0fa36ba463ea5383717841e045aword";
    userData.userRole=1;
    farmerData.user=userData;
    farmerData.community=communityData;
    farmerData.farmerId=5678;
    service.addFarmer(farmerData).subscribe(data=>{
      expect(data).toEqual(message);
    });
    const req = httpMock.expectOne(`${baseURL}/Farmer/AddFarmer`);
    expect(req.request.method).toBe('POST');
  });

  it('should return duplication if farmer individual data is invalid',()=>{
    let message:string="Duplication";
    let farmerData=new FarmerDetails();
    let userData=new User();
    userData.userFullName="jim";
    userData.phoneNumber="9999678768";
    userData.email="jime@gmail.com";
    userData.location="hyderabad";
    userData.password="3460a0fa36ba463ea5383717841e045a";
    userData.userRole=1;
    farmerData.user=userData;
    farmerData.farmerId=1234;
    service.addFarmer(farmerData).subscribe(data=>{
      expect(data).toEqual(message);
    });
    const req = httpMock.expectOne(`${baseURL}/Farmer/AddFarmer`);
    expect(req.request.method).toBe('POST');
  });

  it('should return succesful if farmer individual data is valid',()=>{
    let message:string="Succesful";
    let farmerData=new FarmerDetails();
    let userData=new User();
    userData.userFullName="jonjim";
    userData.phoneNumber="9876787678";
    userData.email="jonjim@gmail.com";
    userData.location="hyderabad";
    userData.password="3460a0fa36ba463ea5383717841e045a";
    userData.userRole=1;
    farmerData.user=userData;
    farmerData.farmerId=91011;
    service.addFarmer(farmerData).subscribe(data=>{
      expect(data).toEqual(message);
    });
    const req = httpMock.expectOne(`${baseURL}/Farmer/AddFarmer`);
    expect(req.request.method).toBe('POST');
  });

});
