import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {productListingDataSingle} from '../../../../assets/testData';

import { UpdateproductsComponent } from './updateproducts.component';

describe('UpdateproductsComponent', () => {
  let component: UpdateproductsComponent;
  let fixture: ComponentFixture<UpdateproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateproductsComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem('productData',JSON.stringify(productListingDataSingle));
    fixture = TestBed.createComponent(UpdateproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
