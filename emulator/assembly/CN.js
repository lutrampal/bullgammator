OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class CN extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(9, AD, OD, OF, bullGamma)
  }

  exeInstructionLogic() {
    let m1 = this.bullGamma.getMemory(1);
    if (this.AD === 0) {
      let vm1 = m1.getDecimalValue(0, m1.blocks.length)
      this.bullGamma.mc.greater = vm1 > this.OF*(10**this.OD)
      this.bullGamma.mc.equal = vm1 === this.OF*(10**this.OD);
    } else {
      let cmpRes = m1.compareTo(this.bullGamma.getMemory(this.AD), this.OD, this.OF)
      this.bullGamma.mc.greater = cmpRes[0]
      this.bullGamma.mc.equal = cmpRes[1]
    }
  }
}

module.exports.CN = CN;