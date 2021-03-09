import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingDataService } from '../../services/listing-data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { baseURL } from '../../../../environments/environment';
import { ProductlistingsComponent } from './productlistings.component';
import { ProductListingData } from '../../../Models/ProductListingData';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/Models/User';
import { ContactRequest } from 'src/app/Models/ContactRequest';



describe('ProductListingsComponent', () => {

  let component: ProductlistingsComponent;
  let fixture: ComponentFixture<ProductlistingsComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [  ProductlistingsComponent],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return false when user is not defined or null',()=>{
    var res = component.getBuyerRequests()
    expect(res).toBeFalse();
  })
  it('should return false when listingId and contact requests listing id dont match',()=>{
    let listing:ProductListingData = new ProductListingData();
    listing.productListingId = 1;
    let contactRequest:ContactRequest = new ContactRequest();
    contactRequest.ProductListingId=2;
    component.contactRequests.push(contactRequest);
    var res = component.getValueListing(listing);
    expect(res).toBeFalse();
  })
  it('should return false when listingId and contact requests listing id dont match',()=>{
    let listing:ProductListingData = new ProductListingData();
    listing.productListingId = 1;
    let contactRequest:ContactRequest = new ContactRequest();
    contactRequest['productListingId']=1;
    component.contactRequests.push(contactRequest);
    var res = component.getValueListing(listing);
    expect(res).toBeTrue();
  })
});