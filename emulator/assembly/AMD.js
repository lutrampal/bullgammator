Instruction = require("./instruction").Instruction

class AMD extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(7, 0, OD, OF, bullGamma)
  }
}

module.exports.AMD = AMD;