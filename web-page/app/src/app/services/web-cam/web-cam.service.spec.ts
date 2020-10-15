import { TestBed } from '@angular/core/testing';

import { WebCamService } from './web-cam.service';

describe('WebCamService', () => {
  let service: WebCamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebCamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
