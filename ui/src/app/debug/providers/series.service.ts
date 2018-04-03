import { Injectable } from '@angular/core';
import { BullgammatorService } from '../../providers/bullgammator.service';

@Injectable()
export class SeriesService {

  serie: number;

  constructor(
    private bull: BullgammatorService
  ) { }

  getInstructions(serie: number) {
    if (serie == 3) {
      return this.bull.instructions;
    } else {
      return [];
    }
  }

  // Returns -1 if the current instruction si not in the give series
  getLine(serie: number) {
    if (serie == 3) {
      return this.bull.bullgamma.cp;
    } else {
      return -1;
    }
  }

}
