import { Injectable } from '@angular/core';

import { Execution } from 'bullgammator';
import { BullgammatorService } from '../../providers/bullgammator.service';

@Injectable()
export class SeriesService {

	exec: Execution;

  constructor(
    private bull: BullgammatorService
  ) {
		this.exec = new Execution(this.bull.bullgamma);
	}

  /*
   *  Returns the instructions list for a given series
   */
  getInstructions(seriesId: number) {
    return this.exec.getInstructions(seriesId);
  }

  /*
   *  Gets the current instruction line
   */
  getLine() {
    return this.exec.getCurrentLine();
  }

	getSeries() {
		return this.exec.getCurrentSeries();
	}

  getSeriesNumber() {
    return this.bull.constants.NB_SERIES;
  }

  getNumberOfInstructions(seriesId: number) {
    return this.exec.getNumberOfInstructions(seriesId);
  }

}
