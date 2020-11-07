Instruction = require("./instruction").Instruction
MethodNotImplementedError = require("./instruction").MethodNotImplementedError;

/**
 * Abstract class for drum transfer instructions
 */
class DrumTransfer extends Instruction {
  constructor(TO, AD, OD, OF, bullGamma) {
    super(TO, AD, OD, OF, bullGamma);
  }

  _transfer(nbGroup, trackGroup, nbTrack, nbBlock) {
    throw new MethodNotImplementedError("_transfer");
  }

  execute() {
    let trackGroup = this.bullGamma.magneticDrum.trackGroups[0];
    if (this.AD % 2 == 1) {
      trackGroup = this.bullGamma.magneticDrum.commutedTrackGroup;
    }
    this._transfer(this.AD >> 1, trackGroup, this.OD, this.OF >> 1);
  }

}

module.exports.DrumTransfer = DrumTransfer;
