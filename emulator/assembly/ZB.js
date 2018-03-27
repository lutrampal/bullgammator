Instruction = require("./instruction").Instruction

class ZB extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(3, AD, OD, OF, bullGamma)
  }

  execute() {
    if (this.AD === 0) {
      return;
    }
    this.bullGamma.getMemory(this.AD).setToZero(this.OD, this.OF);
  }
}

module.exports.ZB = ZB;