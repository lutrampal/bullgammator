Instruction = require("./instruction").Instruction

class MR extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(12, AD, OD, OF, bullGamma)
  }
}

module.exports.MR = MR;