Instruction = require("./instruction").Instruction

class DrumTransfer extends Instruction {
  constructor(TO, AD, OD, OF, bullGamma) {
    super(TO, AD, OD, OF, bullGamma);
  }

  _transfer() {
    throw new Error("You have to implement the method _transfer()")
  }

  execute() {
    this.nbGroup = this.AD >> 1
    this.trackGroup = this.bullGamma.magneticDrum.trackGroups[0]
    if (this.AD ^ 0x1) {
      this.trackGroup = this.bullGamma.magneticDrum.commutedGroup
    }
    this.nbTrack = this.OD
    this.nbBlock = this.OF >> 1
    transfer()
  }

}

module.exports.DrumTransfer = DrumTransfer;