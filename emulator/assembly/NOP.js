Instruction = require("./instruction").Instruction

/**
 * NO Operation
 */
class NOP extends V {
  constructor(bullGamma) {
    super(0, 0, 0, bullGamma)
  }

  execute() {
		// do nothing
  }

	getDescription() {
		return "V - Variante\n"
		+ "Ne fait rien";
	}
}

module.exports.NOP = NOP;
