import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../services/admin.service';

import { MspComponent } from './msp.component';

describe('MspComponent', () => {
  let component: MspComponent;
  let service:AdminService;
  let fixture: ComponentFixture<MspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AdminService],
      declarations: [ MspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(AdminService);
    fixture = TestBed.createComponent(MspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 it('should set productTypeId to undefined',()=>{
   component.productTypeId=2;
   const res=component.update(1);
   expect(component.productTypeId).toBe(undefined);
 });

 it('should set editfield to undefined',()=>{
  component.productTypeId=2;
  const res=component.update(1);
  expect(component.editField).toBe(undefined);
});

 it('should set updateEvent to false',()=>{
   let event={"target":{"textContent":50}};
  component.change(event,1);
  expect(component.updateEvent).toBeFalse();
 });

 it('should have same values for productTypeId and id',()=>{
  let event={"target":{"textContent":50}};
  let id=1;
 component.change(event,id);
 expect(component.productTypeId).toBe(1);
});

it('should return false if tried to update msp without editing msp value',()=>{
  component.productTypeId=undefined;
  component.editField=undefined;
  const res=component.update(1);
  expect(res).toBeFalse();
});
 
it('should return false if msp value is less than or equal to zero',()=>{
  component.productTypeId=undefined;
  component.editField=0;
  const res=component.update(1);
  expect(res).toBeFalse();
});
 
it('should return false if msp value contains characters',()=>{
  component.productTypeId=undefined;
  component.editField=Number("abcd");
  const res=component.update(1);
  expect(res).toBeFalse();
});

});
