Operation = require("./operation").Operation

class MR extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(12, AD, OD, OF, bullGamma)
  }

  execute() {
    let m1 = this.bullGamma.getMemory(1)
    this.bullGamma.md = this.OD;
    let mb;
    let nb_neg_signs = 0;
    if (this.bullGamma.ms1 === 10) {
      nb_neg_signs++;
    }
    if (this.AD > 0) {
      mb = this.bullGamma.getMemory(this.AD)
      this.bullGamma.msb = mb.blocks[this.OF - 1]
      if (this.bullGamma.msb === 10) {
        mb.blocks[this.OF - 1] = 0
        nb_neg_signs++;
      }
    }
    while (this.bullGamma.md !== 0) {
      if (m1.blocks[0] === 0) {
        m1.shiftRight()
        this.bullGamma.md--
      } else {
        m1.blocks[0]--
        if (this.AD > 0) {
          m1.add(mb, this.OD, this.OF, false)
        } else {
          m1.addValue(this.OF, this.OD)
        }
      }
    }
    if (mb) {
      mb.blocks[this.OF - 1] = this.bullGamma.msb
    }
    if (nb_neg_signs % 2 === 0) {
      this.bullGamma.ms1 = 0;
    } else {
      this.bullGamma.ms1 = 10;
    }
  }
}

module.exports.MR = MR