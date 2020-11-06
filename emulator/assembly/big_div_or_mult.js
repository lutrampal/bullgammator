Operation = require("./operation").Operation
Memory = require("../machine/innerComponents/memory").Memory
NB_CHRS_PER_WORD = require("../machine/constants").NB_CHRS_PER_WORD

class BigDivOrMult extends Operation {
  constructor(TO, AD, OD, OF, bullGamma) {
    super(TO, AD, OD, OF, bullGamma)
  }

  /**
   * Abstract method, should compute M1 = M1 OP MB
   * @param mb
   * @protected
   */
  _compute(m1m2, mb) {
    throw Error('You have to implement the method compute.');
  }

  /**
   * Abstract method, should compute M1 = M1 OP OF
   * @protected
   */
  _computeValue(m1m2) {
    throw Error('You have to implement the method computeValue.');
  }

  execute() {
    if (this.AD == 1 || this.AD == 2) {
      throw Error("Cannot execute invalid instruction");
    }

    let m1m2 = new Memory(0, this.bullGamma, NB_CHRS_PER_WORD*2);
    let m1 = this.bullGamma.getMemory(1);
    let m2 = this.bullGamma.getMemory(2);
    m1m2.copyBlockValues(m1, 0, NB_CHRS_PER_WORD);
    for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
      m1m2.shiftLeft();
    }
    m1m2.copyBlockValues(m2, 0, NB_CHRS_PER_WORD);
    if (this.bullGamma.md === 0) {
      this.bullGamma.md = 12;
    }

    if (this.AD == 0) {
      this._computeValue(m1m2);
    }
    if (this.AD > 2) {
      let mb = this.bullGamma.getMemory(this.AD);
      this._compute(m1m2, mb);
    }

    for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
      m1.blocks[i] = m1m2.blocks[i + NB_CHRS_PER_WORD];
      m2.blocks[i] = m1m2.blocks[i];
    }
  }
}

module.exports.BigDivOrMult = BigDivOrMult;
