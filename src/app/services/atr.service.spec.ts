import { TestBed } from '@angular/core/testing';

import { AtrService } from './atr.service';

describe('AtrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtrService = TestBed.get(AtrService);
    expect(service).toBeTruthy();
  });
});
