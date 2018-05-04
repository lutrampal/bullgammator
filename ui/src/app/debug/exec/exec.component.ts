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
    this.bull.bullgamma.execNextInstruction()
  }

  /*
   *  Executes instructions until the next breakpoint
   */
  execUntilBreakPoint() {
    do {
      this.execNextInstruction();
    } while (!this.breakpointAtCurrentLine());
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
        this.bull.bullgamma.cp != 0
    ) {
      return false;
    }
    return this.breakpoints[this.bull.bullgamma.cp].value;
  }

}
