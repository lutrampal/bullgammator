Instruction = require("./instruction").Instruction

class DR extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(13, AD, OD, OF, bullGamma)
  }
}

module.exports.DR = DR;