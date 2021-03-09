import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FarmerDealsGuard } from './farmer-deals.guard';

describe('FarmerDealsGuard', () => {
  let guard: FarmerDealsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [],
      declarations:[]
    });
    guard = TestBed.inject(FarmerDealsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
