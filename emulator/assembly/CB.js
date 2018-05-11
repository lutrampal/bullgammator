Instruction = require("./instruction").Instruction

class CB extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(1, 15, OD, OF, bullGamma)
  }
}

module.exports.CB = CB;