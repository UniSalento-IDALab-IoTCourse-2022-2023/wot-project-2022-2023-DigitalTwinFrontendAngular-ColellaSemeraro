import { TestBed } from '@angular/core/testing';

import { RealtimehrvService } from './realtimehrv.service';

describe('RealtimehrvService', () => {
  let service: RealtimehrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimehrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
