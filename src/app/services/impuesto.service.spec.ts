import { TestBed } from '@angular/core/testing';

import { ImpuestoService } from './impuesto.service';

describe('ImpuestoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImpuestoService = TestBed.get(ImpuestoService);
    expect(service).toBeTruthy();
  });
});
