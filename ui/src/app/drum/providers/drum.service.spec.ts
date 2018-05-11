import { TestBed, inject } from '@angular/core/testing';

import { DrumService } from './drum.service';

describe('DrumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrumService]
    });
  });

  it('should be created', inject([DrumService], (service: DrumService) => {
    expect(service).toBeTruthy();
  }));
});
