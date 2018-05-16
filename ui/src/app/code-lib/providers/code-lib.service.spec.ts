import { TestBed, inject } from '@angular/core/testing';

import { CodeLibService } from './code-lib.service';

describe('CodeLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeLibService]
    });
  });

  it('should be created', inject([CodeLibService], (service: CodeLibService) => {
    expect(service).toBeTruthy();
  }));
});
