Instruction = require("./instruction").Instruction

class CO extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }
}

module.exports.CO = CO;