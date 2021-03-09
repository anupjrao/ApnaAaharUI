import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FarmerUpdateProductGuard } from './farmer-update-product.guard';

describe('FarmerUpdateProductGuard', () => {
  let guard: FarmerUpdateProductGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule]
    });
    guard = TestBed.inject(FarmerUpdateProductGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
