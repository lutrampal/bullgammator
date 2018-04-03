OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class CN extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(9, AD, OD, OF, bullGamma)
  }

  exeInstructionLogic() {
    let m1 = this.bullGamma.getMemory(1);
    if (this.AD === 0) {
      this.bullGamma.mc.greater = m1.blocks[this.OD] > this.OF
      this.bullGamma.mc.equal = m1.blocks[this.OD] === this.OF
    } else {
      let cmpRes = m1.compareTo(this.bullGamma.getMemory(this.AD), this.OD, this.OF)
      this.bullGamma.mc.greater = cmpRes[0]
      this.bullGamma.mc.equal = cmpRes[1]
    }
  }
}

module.exports.CN = CN;