Instruction = require("./instruction").Instruction

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
    this.hexString = TO.toString(16) + AD.toString(16) + OD.toString(16) + OF.toString(16);
  }
}

module.exports.Operation = Operation;
