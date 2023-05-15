import { TestBed } from '@angular/core/testing';

import { ItinarieUserService } from './itinarie-user.service';

describe('ItinarieUserService', () => {
  let service: ItinarieUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItinarieUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
