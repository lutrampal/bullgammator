import { Injectable } from '@angular/core';
import { BullgammatorService } from '../../providers/bullgammator.service';

export class Series {
  id: number;
  nbInst: number;
  offset: number;
}

@Injectable()
export class SeriesService {

  seriesList = {
    0: { id: 0, nbInst: 48, offset: 64 },
    1: { id: 1, nbInst: 48, offset: 112 },
    2: { id: 2, nbInst: 48, offset: 160 },
    3: { id: 3, nbInst: 64, offset: 0 }
  }

  constructor(
    private bull: BullgammatorService
  ) { }

  /*
   *  Returns the instructions list for a given series
   */
  getInstructions(series: Series) {
    // TODO: update with all series
    if (series.id == 3) {
      return this.bull.instructions;
    } else {
      return [];
    }
  }

  /*
   *  Gets the current instruction line
   */
  getLine(series: Series) {
    return this.bull.bullgamma.cp - series.offset;
  }

  getSeriesLineOffset(series: Series) {
    return this.seriesList[series.id].offset;
  }

  getSeriesNumber() {
    return Object.getOwnPropertyNames(this.seriesList).length;
  }

}
