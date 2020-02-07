import { TestBed } from '@angular/core/testing';

import { OperationsHttpService } from './operations-http.service';

describe('OperationsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationsHttpService = TestBed.get(OperationsHttpService);
    expect(service).toBeTruthy();
  });
});
