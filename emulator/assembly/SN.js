OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class SN extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(11, AD, OD, OF, bullGamma)
  }

  _exeInstructionLogic() {
    let m1 = this.bullGamma.getMemory(1)
    if (this.AD > 1) { // use of MB
      let mb = this.bullGamma.getMemory(this.AD)
      if (this.bullGamma.ms1 !== 10 && mb.blocks[this.OF - 1] !== 10) { // M1, MB positive
        m1.subtract(mb, this.OD, this.OF)
        return
      }
      if (this.bullGamma.ms1 !== 10 && mb.blocks[this.OF - 1] === 10) { // M1 positive, MB negative
        mb.blocks[this.OF - 1] = 0
        m1.add(mb, this.OD, this.OF)
        mb.blocks[this.OF - 1] = 10
        return
      }
      if (this.bullGamma.ms1 === 10 && mb.blocks[this.OF - 1] !== 10) { // M1 negative, MB positive
        m1.add(mb, this.OD, this.OF)
        this.bullGamma.ms1 = 10
        return
      }
      if (this.bullGamma.ms1 === 10 && mb.blocks[this.OF - 1] === 10) { // M1, MB negative
        // -M1 + MB <=> MB - M1, so MB gets copied to M1 and a buffer for M1 is used
        let cpM1 = new Memory(1, this.bullGamma)
        cpM1.copyBlockValues(m1, this.OD, this.OF)
        m1.copyBlockValues(mb, this.OD, this.OF)
        m1.blocks[this.OF - 1] = 0
        m1.subtract(cpM1, this.OD, this.OF)
        return
      }
    }
    if (this.AD === 1) {
      m1.setToZero(this.OD, this.OF)
      if (this.bullGamma.ms1 === 10) {
        this.bullGamma.ms1 = 0
      } else {
        this.bullGamma.ms1 = 10
      }
      return
    }
    if (this.AD === 0) {
      this.bullGamma.getMemory(1).addValue(-this.OF, this.OD);
    }
  }
}

module.exports.SN = SN;