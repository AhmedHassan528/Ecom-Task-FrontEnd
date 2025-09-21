import { TestBed } from '@angular/core/testing';

import { AuthServciesService } from './auth-servcies.service';

describe('AuthServciesService', () => {
  let service: AuthServciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
