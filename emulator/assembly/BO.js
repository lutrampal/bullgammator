Operation = require("./operation").Operation
NB_CHRS_PER_WORD = require("../machine/constants").NB_CHRS_PER_WORD

class BO extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(6, AD, OD, OF, bullGamma)
  }

  execute() {
    let m1 = this.bullGamma.getMemory(1);

    // save memory value
    let cp_block = new Array(NB_CHRS_PER_WORD);
    for (let i = this.OD; i < this.OF; i++) {
      cp_block[i] = m1.blocks[i];
    }

    // common
    m1.setToZero(0, 12);
    if (this.AD !== 1) {
      this.bullGamma.ms1 = 0
    }
    this.bullGamma.md = this.OD;

    // cases on AD
    switch (this.AD) {
      case 1:
        m1.setToZero(0, 12);
        for (let i = this.OD; i < this.OF; i++) {
          m1.blocks[i] = cp_block[i];
        }
        break;

      case 0:
        m1.blocks[this.OD] = this.OF;
        break;

      default:
        let mb = this.bullGamma.getMemory(this.AD);
        m1.copyBlockValues(mb, this.OD, this.OF);
        if (this.bullGamma.getMemoryMode() === MEMORY_MODE.DECIMAL && this.AD !== 1 && mb.blocks[this.OF - 1] === 10) {
          this.bullGamma.ms1 = 10;
          m1.blocks[this.OF - 1] = 0;
        }
        break;

    }
  }
}

module.exports.BO = BO;
