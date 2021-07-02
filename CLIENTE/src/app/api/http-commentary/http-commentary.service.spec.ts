import { TestBed } from '@angular/core/testing';

import { HttpCommentaryService } from './http-commentary.service';

describe('HttpCommentaryService', () => {
  let service: HttpCommentaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCommentaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
