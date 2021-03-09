import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistingService } from '../../services/productlisting.service';
import { CarouselComponent } from './carousel.component';
import { productListings } from '../../../../assets/testData/productListingsTest.js'

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { baseURL } from '../../../../environments/environment';


describe('sortProductTypes', ()=> {
  it('should assign tomatoListing if found',()=>{
    let a:ProductlistingService;
    let component = new CarouselComponent(a);
    component.sortProductTypes()
    expect(component.tomatoListing).toBe(component.tomatoListing); 
  })
})


describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let httpMock: HttpTestingController;
  let service: ProductlistingService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductlistingService],
      declarations:[CarouselComponent]
    }).compileComponents();
    service = TestBed.inject(ProductlistingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(service).toBeTruthy();
  });


  it('should create', () => {
    expect(component.ngOnInit).toBeDefined();
  });

  
});

