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

  series: Series;
  breakpoints: FormControl[] = [];

  constructor(
    private s: SeriesService
  ) {
    this.series = this.s.seriesList[3];
  }

  ngOnInit() {
    let indices = Object.getOwnPropertyNames(this.s.seriesList)
      .sort((s1, s2) => this.s.seriesList[s1].offset - this.s.seriesList[s2].offset)
    for (let s of indices) {
      for (var i=0; i<this.s.seriesList[s].nbInst; i++) {
        this.breakpoints.push(new FormControl(false, []));
      }
    }
  }

  getInstructions() {
    return this.s.getInstructions(this.series);
  }

  plus() {
    this.series = this.s.seriesList[(this.series.id + 1) % this.s.getSeriesNumber()];
  }

  minus() {
    this.series = this.s.seriesList[(this.series.id +  this.s.getSeriesNumber() - 1) % this.s.getSeriesNumber()];
  }

  breakpointAt(line: number, series: Series) {
    return this.getControl(line, series).value;
  }

  getHalfNbInst(series: Series) {
    return  Math.floor(series.nbInst/2);
  }

  getControl(line: number, series: Series) {
    return this.breakpoints[series.offset + line];
  }

  emit() {
    this.breakpts_emit.emit(this.breakpoints);
  }

}
