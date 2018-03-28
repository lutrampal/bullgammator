Operation = require("./operation").Operation

class ZB extends Operation {
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