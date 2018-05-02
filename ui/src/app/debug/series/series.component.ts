import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SeriesService, Series } from '../providers/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  @Output()
  breakpts_emit = new EventEmitter<FormControl[]>();

  seriesId: number;
  breakpoints: FormControl[] = [];

  constructor(
    public s: SeriesService
  ) {
    this.seriesId = 3;
  }

  ngOnInit() {
    for (let s of [3, 0, 1, 2]) {
      for (var i=0; i<this.s.getMaxNbInsts(s); i++) {
        this.breakpoints.push(new FormControl(false, []));
      }
    }
  }

  getInstructions() {
    return this.s.getInstructions(this.seriesId);
  }

  plus() {
    this.seriesId = (this.seriesId + 1) % this.s.getSeriesNumber();
  }

  minus() {
    this.seriesId = (this.seriesId + this.s.getSeriesNumber() - 1) % this.s.getSeriesNumber();
  }

  breakpointAt(line: number, seriesId: number) {
    try {
      return this.getControl(line, seriesId).value;
    } catch(error) {
      return false;
    }
  }

  getHalfNbInst(seriesId: number) {
    return  Math.floor(this.s.getMaxNbInsts(seriesId)/2);
  }

  getControl(line: number, seriesId: number) {
    return this.breakpoints[this.s.getSeriesLineOffset(seriesId) + line];
  }

  emit() {
    this.breakpts_emit.emit(this.breakpoints);
  }

}
