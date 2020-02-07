import { TestBed } from '@angular/core/testing';

import { DiamaconService } from './diamacon.service';

describe('DiamaconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiamaconService = TestBed.get(DiamaconService);
    expect(service).toBeTruthy();
  });
});
