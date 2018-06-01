Instruction = require("./instruction").Instruction
MEMORY_MODE = require("../machine/constants").MEMORY_MODE

/**
 * switch to binary mode
 */
class CB extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(1, 15, OD, OF, bullGamma)
  }

  execute() {
    this.bullGamma._memoryMode = MEMORY_MODE.BINARY
  }

	getDescription() {
		return "CB - Calcul Binaire\n"
		+ "Selectionne le mode de calcul binaire";
	}
}

module.exports.CB = CB;
