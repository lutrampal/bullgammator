DrumTransfer = require("./TT").DrumTransfer

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

	getDescription() {
		return "Transfère le contenu des octades " + (this.AD & 0xE) + " et " + (this.AD | 0x1)
		+ " dans le bloc " + (this.OF >> 1) + " de la piste " + this.OD
		+ " de la seizaine " + (this.AD % 2 == 1 ? "commutée" : "0")
		+ " du tambour";
	}
}

module.exports.BT = BT;
