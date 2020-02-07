import { TestBed } from '@angular/core/testing';

import { BillsHttpService } from './bills-http.service';

describe('BillsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillsHttpService = TestBed.get(BillsHttpService);
    expect(service).toBeTruthy();
  });
});
