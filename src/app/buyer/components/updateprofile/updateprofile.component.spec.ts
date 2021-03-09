import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { baseURL } from '../../../../environments/environment';
import { UpdateprofileComponent } from './updateprofile.component';
import {  PasswordModel} from 'src/app/Models/PasswordData';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BuyerService } from '../../services/buyer.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('UpdateProfileComponent', () => {
  let component: UpdateprofileComponent;
  let fixture: ComponentFixture<UpdateprofileComponent>;
  let httpMock: HttpTestingController;
  let service: BuyerService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [BuyerService],
      declarations:[UpdateprofileComponent]
    }).compileComponents();
    service = TestBed.inject(BuyerService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UpdateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit()
  });
});