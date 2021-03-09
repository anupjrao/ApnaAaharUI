import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { ReserPasswordComponent } from './reser-password.component';

describe('ReserPasswordComponent', () => {
  let component: ReserPasswordComponent;
  let fixture: ComponentFixture<ReserPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ReserPasswordComponent,
        RouterTestingModule
       ],
      imports: [ ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
