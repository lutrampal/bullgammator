import { Injectable } from '@angular/core';
import { BullgammatorService } from '../../providers/bullgammator.service';

export class Series {
  id: number;
  nbInst: number;
  offset: number;
}

@Injectable()
export class SeriesService {

  constructor(
    private bull: BullgammatorService
  ) { }

  /*
   *  Returns the instructions list for a given series
   */
  getInstructions(seriesId: number) {
    return this.bull.bullgamma.getSerie(seriesId).getInstructions();
  }

  /*
   *  Gets the current instruction line
   */
  getLine() {
    return this.bull.bullgamma.nl;
  }

	getSeries() {
		return this.bull.bullgamma.ns;
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
