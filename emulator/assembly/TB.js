DrumTransfer = require("./TT").DrumTransfer

const NB_WORD_PER_DRUM_BLOCK = require('../machine/constants').NB_WORD_PER_DRUM_BLOCK

/**
 * drum to group transfer
 */
class TB extends DrumTransfer {
  constructor(AD, OD, OF, bullGamma) {
    super(2, AD, OD, OF, bullGamma);
  }

  _transfer(nbGroup, trackGroup, nbTrack, nbBlock) {
    for (let w=0; w<NB_WORD_PER_DRUM_BLOCK; w++) {
      this.bullGamma.groups[nbGroup].getWord(w).copy(
        trackGroup.tracks[nbTrack].blocks[nbBlock].getWord(w));
    }
  }

  getDescription() {
    return "Transfère le contenu du bloc " + (this.OF >> 1)
    + " de la piste " + this.OD
    + " de la seizaine " + (this.AD % 2 == 1 ? "commutée" : "0")
    + " du tambour dans les octades " + (this.AD & 0xE) + " et " + (this.AD | 0x1);
  }

  getShortType() {
    return "TB";
  }

  getLongType() {
    return "Transfert du Tambour en mémoire Banale";
  }

}

module.exports.TB = TB;
