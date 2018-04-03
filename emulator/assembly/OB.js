OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift
const MEMORY_MODE = require("../machine/bullGamma").MEMORY_MODE;

class OB extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(8, AD, OD, OF, bullGamma)
  }

  exeInstructionLogic() {
    let m1 = this.bullGamma.getMemory(1)
    if (this.AD !== 1){
      let mb = this.bullGamma.getMemory(this.AD)
      mb.copyBlockValues(m1, this.OD, this.OF)
      if (mb.blocks[this.OF - 1] === 0) {
        mb.blocks[this.OF - 1] = this.bullGamma.ms1
      }
    } else {
      m1.setToZero(this.OD, this.OF)
    }
  }
}

module.exports.OB = OB;