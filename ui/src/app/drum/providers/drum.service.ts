import { Injectable } from '@angular/core';
import { BullgammatorService } from '../../providers/bullgammator.service';

@Injectable()
export class DrumService {

  constructor(
    private bull: BullgammatorService
  ) { }

	getBlock(trackId: number, block: number): string {
		return this.bull.bullgamma.magneticDrum
		.trackGroups[Math.floor(trackId / this.bull.constants.NB_TRACKS_PER_DRUM_TRACK_GROUP)]
		.tracks[trackId % this.bull.constants.NB_TRACKS_PER_DRUM_TRACK_GROUP]
		.blocks[block].toString();
	}

	setContent(hexCode: string): void {
		this.bull.bullgamma.magneticDrum.setContent(hexCode);
	}
}
