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
  getInstructions(seriesId: number) {
      return this.bull.bullgamma.getSerie(seriesId).instructions;
  }

  /*
   *  Gets the current instruction line
   */
  getLine(seriesId: number) {
    return this.bull.bullgamma.cp - this.getSeriesLineOffset(seriesId);
  }

  getSeriesLineOffset(seriesId: number) {
    return this.bull.bullgamma.getSerie(seriesId).lineOffset;
  }

  getSeriesNumber() {
    return this.bull.constants.NB_GENERAL_SERIES + 1;
  }

  getNbInsts(seriesId: number) {
    return this.bull.bullgamma.getSerie(seriesId).nbInst;
  }

  getMaxNbInsts(seriesId: number) {
    return this.bull.bullgamma.getSerie(seriesId).maxNbInst;
  }

}
