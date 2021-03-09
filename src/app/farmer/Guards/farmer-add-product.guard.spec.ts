import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FarmerAddProductGuard } from './farmer-add-product.guard';

describe('FarmerAddProductGuard', () => {
  let guard: FarmerAddProductGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [],
      declarations:[]
    });
    guard = TestBed.inject(FarmerAddProductGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
