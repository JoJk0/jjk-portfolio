import { TestBed } from '@angular/core/testing';

import { JJKUtilsService } from './jjkutils.service';

describe('JJKUtilsService', () => {
  let service: JJKUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JJKUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
