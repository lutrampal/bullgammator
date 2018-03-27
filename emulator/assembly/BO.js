Instruction = require("./instruction").Instruction

class BO extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(6, AD, OD, OF, bullGamma)
  }
}

module.exports.BO = BO;