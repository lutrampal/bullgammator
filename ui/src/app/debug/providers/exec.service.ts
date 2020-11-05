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

	executeNextInstruction(): void {
		this.exec.executeNextInstruction();
	}

	executeUntil(line: number, seriesId: number): void {
		this.exec.executeUntil(line, seriesId);
	}

	getLine(): number {
		return this.exec.getCurrentLine();
	}

	getSeries(): number {
		return this.exec.getCurrentSeries();
	}

	getNumberOfSeries(): number {
		return this.bull.constants.NB_SERIES;
	}

	getConsoleLines(): string[] {
		return this.exec.console.getLines();
	}

	writeConsoleLine(line: string): void {
		this.exec.writeConsoleLine(line);
	}
}
