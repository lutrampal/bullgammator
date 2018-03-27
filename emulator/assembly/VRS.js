Instruction = require("./instruction").Instruction

class VRS extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }
}

module.exports.VRS = VRS;