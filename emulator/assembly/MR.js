Operation = require("./operation").Operation

class MR extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(12, AD, OD, OF, bullGamma)
  }

  execute() {
    let m1 = this.bullGamma.getMemory(1)
    this.bullGamma.md = this.OD;
    let nb_neg_signs = 0
    if (this.bullGamma.ms1 === 10) {
      nb_neg_signs++;
    }
    if (this.AD > 0) {
      let mb = this.bullGamma.getMemory(this.AD)
      if (mb.blocks[this.OF - 1] === 10) {
        mb.blocks[this.OF - 1] = 0
        m1.multiply(mb, this.OD, this.OF)
        mb.blocks[this.OF - 1] = 10
        nb_neg_signs++
      } else {
        m1.multiply(mb, this.OD, this.OF)
      }
    } else {
        m1.multiplyValue(this.OF, this.OD)
    }
    if (nb_neg_signs % 2 === 0) {
      this.bullGamma.ms1 = 0
    } else {
      this.bullGamma.ms1 = 10
    }
  }

}

module.exports.MR = MR