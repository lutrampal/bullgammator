import { Component, OnInit } from '@angular/core';

import { SeriesService } from '../providers/series.service';
import { BullgammatorService } from '../../providers/bullgammator.service';

@Component({
  selector: 'app-exec',
  templateUrl: './exec.component.html',
  styleUrls: ['./exec.component.css']
})
export class ExecComponent implements OnInit {

  constructor(
    private bull: BullgammatorService,
    private s: SeriesService
  ) { }

  ngOnInit() {
  }

  nextInst() {
    let insts = this.s.getInstructions(3);
    insts[this.s.getLine(3)].execute();
    this.bull.bullgamma.cp = (this.bull.bullgamma.cp + 1) % (insts.length > 64 ? 64: insts.length);
  }

}
