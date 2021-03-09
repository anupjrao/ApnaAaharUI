import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FarmerGuardGuard } from './farmer-guard.guard';

describe('FarmerGuardGuard', () => {
  let guard: FarmerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule]
    });
    guard = TestBed.inject(FarmerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
