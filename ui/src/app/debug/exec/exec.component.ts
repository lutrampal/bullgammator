import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SeriesService } from '../providers/series.service';
import { BullgammatorService } from '../../providers/bullgammator.service';

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
    private bull: BullgammatorService,
    private s: SeriesService
  ) { }

  ngOnInit() {
    this.breakpoints = [new FormControl(true, [])];
  }

  /*
   *  Executes one instruction and prepare the next
   */
  execNextInstruction() {
		try {
			this.error = null;
	    this.bull.bullgamma.execNextInstruction()
		} catch (error) {
			this.error = error;
		}
  }

  /*
   *  Executes instructions until the next breakpoint
   */
  execUntilBreakPoint() {
		try {
			do {
				this.error = null;
				this.bull.bullgamma.execNextInstruction();
			} while (!this.breakpointAtCurrentLine());
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
    if (this.breakpoints.length == 1 &&
        this.breakpoints[0].value == true &&
        (this.bull.bullgamma.nl != 0 || this.bull.bullgamma.ns != 3)
    ) {
      return false;
    }
		let seriesCode = (this.bull.bullgamma.ns + 1) % this.s.getSeriesNumber();
    return this.breakpoints[(seriesCode << 6) + this.bull.bullgamma.nl].value;
  }

}
