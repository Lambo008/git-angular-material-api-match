import { TestBed } from '@angular/core/testing';

import { XmlReaderHttpService } from './xml-reader-http.service';

describe('XmlReaderHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XmlReaderHttpService = TestBed.get(XmlReaderHttpService);
    expect(service).toBeTruthy();
  });
});
