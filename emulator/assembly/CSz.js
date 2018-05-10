Instruction = require("./instruction").Instruction

class CSz extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(1, 13, OD, OF, bullGamma)
  }
}

module.exports.CSz = CSz;