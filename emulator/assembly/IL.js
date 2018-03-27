Instruction = require("./instruction").Instruction

class IL extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(7, AD, OD, OF, bullGamma)
  }
}

module.exports.IL = IL;