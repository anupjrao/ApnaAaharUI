import { TestBed } from '@angular/core/testing';

import { baseURL } from '../../../environments/environment';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/app/Models/User';
import {BuyerResponse} from  '../../Models/BuyerResponse';
import { DealsService } from './deals.service';

describe('DealsService', () => {
 
  let httpMock: HttpTestingController;
  let service: DealsService; 
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DealsService]
    
    }).compileComponents();
    service = TestBed.inject(DealsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

 
  it('Should return true', () => {
    
    let buyerResponse:BuyerResponse = new BuyerResponse();
    let isAdded:boolean = true;
     buyerResponse={

      UserId:1,
      Email:"abcd@gmail.com",
      isAccepted:true,
      ContactRequestId:3,
      phoneNumber: "678808978699"
    };
     
    service.sendFarmersResponse(buyerResponse).subscribe(data => {
      expect(data).toBe(isAdded);
    });
    const req = httpMock.expectOne(`${baseURL}/Farmer/SendFarmerResponse`);
    expect(req.request.method).toBe('POST');

  })


  it('Should return false', () => {
    let isAdded:boolean=false;
    let buyerResponseResult  = new BuyerResponse();
     buyerResponseResult = {
      UserId:1,
      Email:"abcd@gmail.com",
      isAccepted:true,
      ContactRequestId:3,
      phoneNumber: "678808978699"
     }
    service.sendFarmersResponse(buyerResponseResult).subscribe(data => {
      expect(data).toBe(isAdded);
    });
    const req = httpMock.expectOne(`${baseURL}/Farmer/SendFarmerResponse`);
    expect(req.request.method).toBe('POST');
   
  })
  it('Should return list of contactRequests', () => {
    
   let dealsData = ["abc"];
   let userID = 1;

    service.getBuyersListings(userID).subscribe(data => {
      expect(data).toEqual(dealsData);
    });
    const req = httpMock.expectOne(`${baseURL}/Farmer/GetBuyers/${userID}`);
    expect(req.request.method).toBe('GET');
    req.flush(dealsData);
  })
  it('Should return null', () => {
    
    let dealsData = null;
    let userID = 1;
 
     service.getBuyersListings(userID).subscribe(data => {
       expect(data).toBeNull;
     });
     const req = httpMock.expectOne(`${baseURL}/Farmer/GetBuyers/${userID}`);
     expect(req.request.method).toBe('GET');
     req.flush(dealsData);
   })
});
