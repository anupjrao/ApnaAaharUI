import { HttpClientTestingModule } from '@angular/common/http/testing';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BuyerResponse } from 'src/app/Models/BuyerResponse';
import {token, buyerReqData} from '../../../../assets/testData';

import { DealsComponent } from './deals.component';

describe('DealsComponent', () => {
  let component: DealsComponent;
  let fixture: ComponentFixture<DealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem('authToken',JSON.stringify(token));
    fixture = TestBed.createComponent(DealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should delete session storage',()=>{
    component.ngOnDestroy();
    expect(sessionStorage.getItem('DealComponentTriggered')).toBeNull();
  })
  it('should do something',()=>{
    let expectedresult = JSON.parse(JSON.stringify(buyerReqData));
    component.dealsData = JSON.parse(JSON.stringify(buyerReqData));
    var res = component.getBuyerListing();
    expect(expectedresult).toEqual(component.dealsData);
    expect(res).toBeUndefined();
  })
});
