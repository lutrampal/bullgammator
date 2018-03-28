Instruction = require("./instruction").Instruction

class KB extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(4, AD, OD, OF, bullGamma)
  }

  execute() {
    this.bullGamma.getMemory(this.AD).setBlockValue(this.OD, this.OF);
  }

}

module.exports.KB = KB;