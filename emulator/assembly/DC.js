Instruction = require("./instruction").Instruction

class DC extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(15, AD, OD, OF, bullGamma)
  }
}

module.exports.DC = DC;