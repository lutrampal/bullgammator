Instruction = require("./instruction").Instruction

/**
 * V Operation
 */
class V extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(0, AD, OD, OF, bullGamma);
  }

  getShortType() {
    return "V";
  }

  getLongType() {
    return "Variante";
  }
}

module.exports.V = V;
