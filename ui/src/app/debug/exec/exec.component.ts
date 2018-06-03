import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ExecService } from '../providers/exec.service';

@Component({
  selector: 'app-exec',
  templateUrl: './exec.component.html',
  styleUrls: ['./exec.component.css']
})
export class ExecComponent implements OnInit {

  @Input()
  breakpoints: FormControl[] = [];
	error: any;

  constructor(
    private exec: ExecService
  ) { }

  ngOnInit() {
		this.breakpoints = [];
  }

  /*
   *  Executes one instruction and prepare the next
   */
  executeNextInstruction() {
		try {
			this.error = null;
	    this.exec.executeNextInstruction();
		} catch (error) {
			this.error = error;
		}
  }

  /*
   *  Executes instructions until the next breakpoint
   */
  execUntilBreakPoint() {
		try {
			this.error = null;
			if (this.breakpoints.length == 0) {
				this.exec.executeUntil(0, 3);
			} else {
				do {
					this.exec.executeNextInstruction();
				} while (!this.breakpointAtCurrentLine());
			}
		} catch (error) {
			this.error = error;
		}
  }

  /*
   *  Returns wether the is a breakpoint at the next line to bez executed
   */
  breakpointAtCurrentLine() {
    if (typeof this.breakpoints == 'undefined') {
      return true;
    }
		let seriesCode = (this.exec.getSeries() + 1) % this.exec.getNumberOfSeries();
    return this.breakpoints[(seriesCode << 6) + this.exec.getLine()].value;
  }

	getConsoleLines() {
		return this.exec.getConsoleLines();
	}

	getDescription() {
		return ""; // TODO
	}

}
