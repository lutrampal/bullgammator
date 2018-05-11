Operation = require("./operation").Operation
Memory = require("../machine/memory").Memory
NB_BLOCKS_PER_MEMORY = require("../machine/memory").NB_BLOCKS_PER_MEMORY

class SmallDivOrMult extends Operation {
  constructor(TO, AD, OD, OF, bullGamma) {
    super(TO, AD, OD, OF, bullGamma)
  }

  _compute(mb) {
    throw new Error('You have to implement the method _compute().');
  }

  _computeValue() {
    throw new Error('You have to implement the method _computeValue().');
  }

  execute() {
    this.bullGamma.md = this.OD;
    let nb_neg_signs = 0
    if (this.bullGamma.ms1 === 10) {
      nb_neg_signs++;
    }
    if (this.AD > 0) {
      let mb = this.bullGamma.getMemory(this.AD)
      if (mb.blocks[this.OF - 1] === 10) {
        mb.blocks[this.OF - 1] = 0
        this._compute(mb)
        mb.blocks[this.OF - 1] = 10
        nb_neg_signs++
      } else {
        this._compute(mb)
      }
    } else {
      this._computeValue()
    }
    if (nb_neg_signs % 2 === 0) {
      this.bullGamma.ms1 = 0
    } else {
      this.bullGamma.ms1 = 10
    }
  }

}

module.exports.SmallDivOrMult = SmallDivOrMult;