import { TestBed } from '@angular/core/testing';

import { ItinariesService } from './itinaries.service';

describe('ItinariesService', () => {
  let service: ItinariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItinariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
