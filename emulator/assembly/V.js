Instruction = require("./instruction").Instruction

class V extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(0, AD, OD, OF, bullGamma)
  }

  execute() {
    let jump_cond_matrix = [
      [false, this.bullGamma.mc.isGreater(), this.bullGamma.mc.isEqual(), this.bullGamma.mc.isGreaterOrEqual(),
        this.bullGamma.ms1 === 10],
      [true, this.bullGamma.mc.isLowerOrEqual(), this.bullGamma.mc.isNotEqual(), this.bullGamma.mc.isLower(),
        this.bullGamma.ms1 === 0],
    ]
    if (jump_cond_matrix[this.OF%4][this.AD] === undefined) {
      throw "jump condition not implemented yet";
    }
    if (jump_cond_matrix[this.OF%4][this.AD]) {
      this.bullGamma.nl = (this.OD << 2) + (this.OF >> 2);
    }
  }
}

module.exports.V = V;
