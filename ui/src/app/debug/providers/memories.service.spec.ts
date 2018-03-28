import { TestBed, inject } from '@angular/core/testing';

import { MemoriesService } from './memories.service';

describe('MemoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoriesService]
    });
  });

  it('should be created', inject([MemoriesService], (service: MemoriesService) => {
    expect(service).toBeTruthy();
  }));
});
