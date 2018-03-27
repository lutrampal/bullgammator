Instruction = require("./instruction").Instruction

class AN extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(10, AD, OD, OF, bullGamma)
  }
}

module.exports.AN = AN;
