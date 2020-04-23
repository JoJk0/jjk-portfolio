import { TestBed } from '@angular/core/testing';

import { ScrollGSAPService } from './scroll-gsap.service';

describe('ScrollGSAPService', () => {
  let service: ScrollGSAPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollGSAPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
