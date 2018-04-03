import { TestBed, inject } from '@angular/core/testing';

import { BullgammatorService } from './bullgammator.service';

describe('BullgammatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BullgammatorService]
    });
  });

  it('should be created', inject([BullgammatorService], (service: BullgammatorService) => {
    expect(service).toBeTruthy();
  }));
});
