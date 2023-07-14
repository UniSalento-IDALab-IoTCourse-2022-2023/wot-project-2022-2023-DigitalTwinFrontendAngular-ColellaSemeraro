import { TestBed } from '@angular/core/testing';

import { AssegnazioneService } from './assegnazione.service';

describe('AssegnazioneService', () => {
  let service: AssegnazioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssegnazioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
