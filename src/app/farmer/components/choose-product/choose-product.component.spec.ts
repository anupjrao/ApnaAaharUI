import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {token, buyerReqData,productType} from '../../../../assets/testData';
import { FarmerProdcutServiceService } from '../../Services/farmer-prodcut-service.service';

import { ChooseProductComponent } from './choose-product.component';

describe('ChooseProductComponent', () => {
  let component: ChooseProductComponent;
  let fixture: ComponentFixture<ChooseProductComponent>;
  let service: FarmerProdcutServiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseProductComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[FarmerProdcutServiceService]
    })
    .compileComponents();
    service = TestBed.inject(FarmerProdcutServiceService);
  }));

  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem('authToken',JSON.stringify(token));
    fixture = TestBed.createComponent(ChooseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get value', () => {
    var res=component.GetValue(productType)
    expect(res).not.toBeNull;
  });
});
