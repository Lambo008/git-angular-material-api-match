import { TestBed } from '@angular/core/testing';

import { ConfigurarService } from './configurar.service';

describe('ConfigurarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigurarService = TestBed.get(ConfigurarService);
    expect(service).toBeTruthy();
  });
});
