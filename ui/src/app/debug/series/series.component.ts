import { Component, OnInit } from '@angular/core';

import { SeriesService } from '../providers/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  serie: number;

  constructor(
    private s: SeriesService
  ) {
    this.serie = 3;
  }

  ngOnInit() {
  }

  getInstructions() {
    return this.s.getInstructions(this.serie);
  }

  plus() {
    this.serie = (this.serie + 1) % 4;
  }

  minus() {
    this.serie = (this.serie + 3) % 4;
  }

}
