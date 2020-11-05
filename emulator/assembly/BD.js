Instruction = require("./instruction").Instruction

/**
 * M2 to MD transfer
 */
class BD extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(7, 2, OD, OF, bullGamma);
  }

  execute() {
    this.bullGamma.md = this.bullGamma.getMemory(2).blocks[this.OD];
  }

	getDescription() {
		return "Met la valeur en position " + this.OD + " de M2 en mémoire de décalage";
	}

	getShortType() {
		return "BD";
	}

	getLongType() {
		return "Transfert de mémoire Banale en mémoire de Décalage";
	}

}

module.exports.BD = BD;
