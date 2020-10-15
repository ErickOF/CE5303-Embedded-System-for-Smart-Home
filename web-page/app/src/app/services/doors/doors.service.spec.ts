import { TestBed } from '@angular/core/testing';

import { DoorsService } from './doors.service';

describe('DoorsService', () => {
  let service: DoorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
