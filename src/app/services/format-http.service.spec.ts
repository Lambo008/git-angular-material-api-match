import { TestBed } from '@angular/core/testing';

import { FormatHttpService } from './format-http.service';

describe('FormatHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormatHttpService = TestBed.get(FormatHttpService);
    expect(service).toBeTruthy();
  });
});
