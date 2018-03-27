Instruction = require("./instruction").Instruction

class OB extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(8, AD, OD, OF, bullGamma)
  }
}

module.exports.OB = OB;