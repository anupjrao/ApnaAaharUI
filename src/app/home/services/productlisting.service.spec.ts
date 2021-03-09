import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { productListingData } from '../../../assets/testData';
import { ProductlistingService } from './productlisting.service';
import { baseURL } from '../../../environments/environment';

describe('ProductlistingService', () => {
  let service: ProductlistingService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductlistingService],
      declarations: []
    });
    service = TestBed.inject(ProductlistingService);
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
  
});
