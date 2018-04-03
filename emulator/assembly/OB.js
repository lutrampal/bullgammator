Operation = require("./operation").Operation
KB = require("./KB").KB;
const MEMORY_MODE = require("../machine/bullGamma").MEMORY_MODE;

class OB extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(8, AD, OD, OF, bullGamma)
  }

  execute() {
    let m1 = this.bullGamma.getMemory(1);
    m1.setToZero(0, 12);
    if (this.AD !== 1) {
      this.bullGamma.ms1 = 0
    }
    this.bullGamma.md = this.OD;

    if (this.AD !== 0) {
      let mb = this.bullGamma.getMemory(this.AD);
      m1.copyBlockValues(mb, this.OD, this.OF);
      if (this.bullGamma.getMemoryMode() === MEMORY_MODE.DECIMAL && this.AD !== 1 && mb.blocks[this.OF - 1] === 10) {
        this.bullGamma.ms1 = 10
        m1.blocks[this.OF - 1] = 0;
      }
    } else {
      new KB(1, this.OD, this.OF, this.bullGamma).execute();
    }
  }
}

module.exports.OB = OB;