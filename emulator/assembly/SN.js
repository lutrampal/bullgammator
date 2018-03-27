Instruction = require("./instruction").Instruction

class SN extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(11, AD, OD, OF, bullGamma)
  }
}

module.exports.SN = SN;