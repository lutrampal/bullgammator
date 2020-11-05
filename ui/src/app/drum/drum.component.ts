import { Component, OnInit } from '@angular/core';
import { DrumService } from './providers/drum.service';
import { BullgammatorService } from '../providers/bullgammator.service';

@Component({
  selector: 'app-drum',
  templateUrl: './drum.component.html',
  styleUrls: ['./drum.component.css']
})
export class DrumComponent implements OnInit {

	bl_index = 0;
	tr_index = 0;
	gr_index = 0;

  constructor(
		public drum: DrumService,
		public bull: BullgammatorService
	) { }

  ngOnInit(): void {
  }

	displayBlock(i, j, k): string {
		return "00: "+ this.drum.getBlock(i * this.bull.constants.NB_TRACKS_PER_DRUM_TRACK_GROUP + j, k)
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;01: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;02: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;03: ")
			.replace("\n", "<br>04: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;05: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;06: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;07: ")
			.replace("\n", "<br>08: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;09: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;10: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;11: ")
			.replace("\n", "<br>12: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;13: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;14: ")
			.replace("\t", "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;15: ");
	}

}
