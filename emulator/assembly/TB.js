DrumTransfer = require("./TT").DrumTransfer

const NB_WORD_PER_DRUM_BLOCK = require('../machine/constants').NB_WORD_PER_DRUM_BLOCK

class TB extends DrumTransfer {
  constructor(AD, OD, OF, bullGamma) {
    super(2, AD, OD, OF, bullGamma)
  }

	_transfer(nbGroup, trackGroup, nbTrack, nbBlock) {
		for (let w=0; w<NB_WORD_PER_DRUM_BLOCK; w++) {
			this.bullGamma.groups[nbGroup].getWord(w).copy(
				trackGroup.tracks[nbTrack].blocks[nbBlock].getWord(w));
		}
  }
}

module.exports.TB = TB;
