Instruction = require("./instruction").Instruction

class VCS extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }
}

module.exports.VCS = VCS;