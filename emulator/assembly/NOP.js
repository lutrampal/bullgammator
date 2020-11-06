Instruction = require("./instruction").Instruction

/**
 * NO Operation
 */
class NOP extends V {
  constructor(bullGamma) {
    super(0, 0, 0, bullGamma);
  }

  execute() {
    // do nothing
  }

  getDescription() {
    return "Ne fait rien";
  }

  getShortType() {
    return "V";
  }

  getLongType() {
    return "Variante";
  }
}

module.exports.NOP = NOP;
