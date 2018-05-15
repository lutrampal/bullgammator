import { Injectable } from '@angular/core';

import { Execution } from 'bullgammator';
import { BullgammatorService } from '../../providers/bullgammator.service';

@Injectable()
export class ExecService {

	exec: Execution;

  constructor(
    private bull: BullgammatorService
  ) {
		this.exec = new Execution(this.bull.bullgamma);
	}

	executeNextInstruction() {
		this.exec.executeNextInstruction();
	}

	executeUntil(line: number, seriesId: number) {
		this.exec.executeUntil(line, seriesId);
	}

	getLine() {
		return this.exec.getCurrentLine();
	}

	getSeries() {
		return this.exec.getCurrentSeries();
	}

	getNumberOfSeries() {
		return this.bull.constants.NB_SERIES;
	}
}
