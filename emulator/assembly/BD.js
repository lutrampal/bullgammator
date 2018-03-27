Instruction = require("./instruction").Instruction

class BD extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(7, 2, OD, OF, bullGamma)
  }
}

module.exports.BD = BD;