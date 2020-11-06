Instruction = require("./instruction").Instruction
MEMORY_MODE = require("../machine/constants").MEMORY_MODE

/**
 * switch to decimal mode
 */
class CD extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(1, 10, OD, OF, bullGamma);
  }

  execute() {
    this.bullGamma._memoryMode = MEMORY_MODE.DECIMAL;
  }

  getDescription() {
    return "Selectionne le mode de calcul décimal";
  }

  getShortType() {
    return "CD";
  }

  getLongType() {
    return "Calcul Décimal";
  }

}

module.exports.CD = CD;
