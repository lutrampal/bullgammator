Instruction = require("./instruction").Instruction

class MC extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(14, AD, OD, OF, bullGamma)
  }
}

module.exports.MC = MC;