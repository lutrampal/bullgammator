Instruction = require("./instruction").Instruction

class KB extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(4, AD, OD, OF, bullGamma)
  }
}

module.exports.KB = KB;