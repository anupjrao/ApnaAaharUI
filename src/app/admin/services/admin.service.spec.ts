import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductType } from '../../Models/ProductType';
import { baseURL } from '../../../environments/environment';
import { AdminService } from './admin.service';
import {User} from '../../Models/User';

describe('AdminService', () => {
  let httpMock: HttpTestingController;
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all product types if exists',()=>{
   let productTypes=[{"productTypeId":1,"productType1":"tomato","msp":30},
   {"productTypeId":2,"productType1":"potato","msp":40},
   {"productTypeId":3,"productType1":"onion","msp":50}
   ];
    service.getProductTypes().subscribe(data=>{
      expect(data).toBe(productTypes);
    });
    const req=httpMock.expectOne(`${baseURL}/Admin/GetProductTypes`);
    expect(req.request.method).toBe('GET');
  });

  it('should return nothing when no product types exists',()=>{
    let productTypes=[];
     service.getProductTypes().subscribe(data=>{
       expect(data).toBe(productTypes);
     });
     const req=httpMock.expectOne(`${baseURL}/Admin/GetProductTypes`);
     expect(req.request.method).toBe('GET');
   });

   it('should return true when product type is updated',()=>{
    let isUpdated:boolean=true;
    let productType=new ProductType();
    productType.productTypeId=1;
    productType.productType1="tomato";
    productType.msp=50;
     service.updateMsp(productType).subscribe(data=>{
       expect(data).toBe(isUpdated);
     });
     const req=httpMock.expectOne(`${baseURL}/Admin/UpdateMsp`);
     expect(req.request.method).toBe('POST');
   });

   it('should return false when product type is not updated',()=>{
    let isUpdated:boolean=false;
    let productType=new ProductType();
    productType.productTypeId=2;
    productType.productType1="potato";
    productType.msp=50;
     service.updateMsp(productType).subscribe(data=>{
       expect(data).toBe(isUpdated);
     });
     const req=httpMock.expectOne(`${baseURL}/Admin/UpdateMsp`);
     expect(req.request.method).toBe('POST');
   });

   it('DisableUser should return true means user disabled',()=>{
    let user=new User();
    user.userId=1;
    service.disableUser(user).subscribe(data=>{
      expect(data).toBe(true);
    }); 
    const req = httpMock.expectOne(`${baseURL}/Admin/DisableUser`);
      expect(req.request.method).toBe('POST');
  });
  it('DisableUser should return false means user not disabled',()=>{
    let user=new User();
    user.userId=1;
    service.disableUser(user).subscribe(data=>{
      expect(data).toBe(false);
    }); 
    const req = httpMock.expectOne(`${baseURL}/Admin/DisableUser`);
      expect(req.request.method).toBe('POST');
  });

  it('Accept Request should return true means request accepted',()=>{
    let user=new User();
    user.userId=1;
    service.acceptRequest(user).subscribe(data=>{
      expect(data).toBe(true);
    }); 
    const req = httpMock.expectOne(`${baseURL}/Admin/AcceptRequest`);
      expect(req.request.method).toBe('POST');
  });

  it('Decline Request should return true means request declined',()=>{
    let user=new User();
    user.userId=1;
    service.declineRequest(user).subscribe(data=>{
      expect(data).toBe(true);
    }); 
    const req = httpMock.expectOne(`${baseURL}/Admin/declineRequest`);
      expect(req.request.method).toBe('POST');
  });
});
