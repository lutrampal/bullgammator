Instruction = require("./instruction").Instruction

/**
 * Shift memory (MD) affectation MD := OF
 */
class AMD extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(7, 0, OD, OF, bullGamma);
  }

  execute() {
    this.bullGamma.md = this.OF;
  }

	getDescription() {
		return "Met la mémoire de décalage à " + this.OF;
	}

	getShortType() {
		return "AMD";
	}

	getLongType() {
		return "Alteration de la Mémoire de Décalage";
	}

}

module.exports.AMD = AMD;
