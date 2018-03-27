Instruction = require("./instruction").Instruction

class CD extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }
}

module.exports.CD = CD;