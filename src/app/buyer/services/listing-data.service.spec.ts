import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { productListingData,contactData } from '../../../assets/testData';
import {baseURL} from '../../../environments/environment';
import { ListingDataService } from './listing-data.service';

describe('ListingDataService', () => {
  let service: ListingDataService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ListingDataService],
      declarations:[]
    });
    service = TestBed.inject(ListingDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return product listings', () => {
    let dataList = productListingData;
    service.getProductListings().subscribe(data => {
      expect(data).toEqual(productListingData);
    });
    const req = httpMock.expectOne(`${baseURL}/ProductListings/GetListings`);
    expect(req.request.method).toBe('GET');
    req.flush(productListingData);
  })

  it('Should return Buyer Contact Requests', () => {
    let dataList = contactData;
    service.getBuyerContactRequests(1).subscribe(data => {
      expect(data).toEqual(contactData);
    });
    const req = httpMock.expectOne(`${baseURL}/Buyer/GetBuyerContactRequests/1`);
    expect(req.request.method).toBe('GET');
    req.flush(contactData);
  })

  it('Should return filtered product listings', () => {
    let dataList = productListingData;
    service.getProductListingsFiltered("").subscribe(data => {
      expect(data).toEqual(productListingData);
    });
    const req = httpMock.expectOne(`${baseURL}/ProductListings/GetListings/`);
    expect(req.request.method).toBe('GET');
    req.flush(productListingData);
  })
});



