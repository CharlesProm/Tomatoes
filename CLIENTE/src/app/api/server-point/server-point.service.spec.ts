import { TestBed } from '@angular/core/testing';

import { ServerPointService } from './server-point.service';

describe('ServerPointService', () => {
  let service: ServerPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
