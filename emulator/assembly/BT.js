DrumTransfer = require("./drumTransfer").DrumTransfer

const NB_WORD_PER_DRUM_BLOCK = require('../machine/constants').NB_WORD_PER_DRUM_BLOCK

class BT extends DrumTransfer {
  constructor(AD, OD, OF, bullGamma) {
    super(2, AD, OD, OF, bullGamma)
  }

  _transfer(nbGroup, trackGroup, nbTrack, nbBlock) {
		for (let w=0; w<NB_WORD_PER_DRUM_BLOCK; w++) {
			trackGroup.tracks[nbTrack].blocks[nbBlock].getWord(w).copy(
				this.bullGamma.groups[nbGroup].getWord(w));
		}
  }
}

module.exports.BT = BT;
