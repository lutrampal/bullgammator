Instruction = require("./instruction").Instruction

class CSz extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(1, 13, OD, OF, bullGamma)
  }

  execute() {
    this.bullGamma.magneticDrum.setCommutedGroup((this.OF << 1) >> 1)
  }
}

module.exports.CSz = CSz;