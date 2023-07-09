import { TestBed } from '@angular/core/testing';

import { AllenamentoService } from './allenamento.service';

describe('AllenamentoService', () => {
  let service: AllenamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllenamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
