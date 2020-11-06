import { Injectable } from '@angular/core';

import { Execution } from 'bullgammator';
import { BullgammatorService } from '../../providers/bullgammator.service';
import { Instruction } from 'bullgammator';

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
  getInstructions(seriesId: number): Instruction[] {
    return this.exec.getInstructions(seriesId);
  }

  /*
   *  Gets the current instruction line
   */
  getLine(): number {
    return this.exec.getCurrentLine();
  }

  getSeries(): number {
    return this.exec.getCurrentSeries();
  }

  getSeriesNumber(): number {
    return this.bull.constants.NB_SERIES;
  }

  getSeriesList(): number[] {
    return Array.from(Array(this.bull.constants.NB_SERIES).keys());
  }

  getNumberOfInstructions(seriesId: number): number {
    return this.exec.getNumberOfInstructions(seriesId);
  }

}
