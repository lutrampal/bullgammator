import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SeriesService } from '../providers/series.service';

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
		while(this.seriesId != 3 || this.breakpoints.length == 0) {
			for (var i=0; i<this.s.getNumberOfInstructions(this.seriesId); i++) {
				this.breakpoints.push(new FormControl(false, []));
			}
			this.plus();
		}
    this.breakpoints[0].setValue(true);
    this.breakpoints[0].disable();
    this.emit();
  }

  ngOnInit() {
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

  breakpointAt(line: number) {
    try {
      return this.getControl(line).value;
    } catch(error) {
      return false;
    }
  }

	isProgramLine(line: number) {
		return (line == this.s.getLine()) && (this.seriesId == this.s.getSeries());
	}

  getHalfNbInst() {
    return Math.floor(this.s.getNumberOfInstructions(this.seriesId) / 2);
  }

  getControl(line: number) {
		let seriesCode = (this.seriesId + 1) % this.s.getSeriesNumber();
		return this.breakpoints[(seriesCode << 6) + line];
  }

  emit() {
    this.breakpts_emit.emit(this.breakpoints);
  }

	getDescription() {
		return ""; // TODO
	}

}
