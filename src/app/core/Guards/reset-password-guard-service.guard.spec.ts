import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordGuardServiceGuard } from './reset-password-guard-service.guard';

describe('ResetPasswordGuardServiceGuard', () => {
  let guard: ResetPasswordGuardServiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule]
    });
    guard = TestBed.inject(ResetPasswordGuardServiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
