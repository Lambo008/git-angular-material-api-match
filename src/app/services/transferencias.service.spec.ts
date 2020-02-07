import { TestBed } from '@angular/core/testing';

import { TransferenciasService } from './transferencias.service';

describe('TransferenciasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferenciasService = TestBed.get(TransferenciasService);
    expect(service).toBeTruthy();
  });
});
