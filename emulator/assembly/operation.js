Instruction = require("./instruction").Instruction;

/**
 * Abstract class for all instructions where OD cannot be greater than OF
 */
class Operation extends Instruction {
  constructor(TO, AD, OD, OF, bullGamma) {
    let of = OF;
    if (OD >= OF && AD !== 0) {
      of = 12;
    }
    super(TO, AD, OD, of, bullGamma);
    this.hexString = this.getHexCode(TO, AD, OD, OF);
  }
}

module.exports.Operation = Operation;
