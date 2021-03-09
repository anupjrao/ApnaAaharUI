import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UpdateProfileGuard } from './update-profile.guard';

describe('UpdateProfileGuard', () => {
  let guard: UpdateProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule]
    });
    guard = TestBed.inject(UpdateProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
