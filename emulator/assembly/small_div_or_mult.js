Operation = require("./operation").Operation
Memory = require("../machine/innerComponents/memory").Memory
NB_CHRS_PER_WORD = require("../machine/constants").NB_CHRS_PER_WORD

/**
 * Abstract class for reduced multiplication or division instructions
 */
class SmallDivOrMult extends Operation {
  constructor(TO, AD, OD, OF, bullGamma) {
    super(TO, AD, OD, OF, bullGamma)
  }

  /**
   * Abstract method, should compute M1 = M1 OP MB
   * @param mb
   * @protected
   */
  _compute(mb) {
    throw new Error('You have to implement the method _compute().');
  }

  /**
   * Abstract method, should compute M1 = M1 OP OF
   * @protected
   */
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
      if (this.bullGamma.getMemoryMode() === MEMORY_MODE.DECIMAL && mb.blocks[this.OF - 1] === 10) {
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
    if (this.bullGamma.getMemoryMode() === MEMORY_MODE.DECIMAL) {
      if (nb_neg_signs % 2 === 0) {
        this.bullGamma.ms1 = 0
      } else {
        this.bullGamma.ms1 = 10
      }
    }
  }

}

module.exports.SmallDivOrMult = SmallDivOrMult;
