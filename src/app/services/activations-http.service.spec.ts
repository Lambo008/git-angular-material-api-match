import { TestBed } from '@angular/core/testing';

import { ActivationsHttpService } from './activations-http.service';

describe('ActivationsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivationsHttpService = TestBed.get(ActivationsHttpService);
    expect(service).toBeTruthy();
  });
});
