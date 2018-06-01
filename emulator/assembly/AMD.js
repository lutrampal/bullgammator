Instruction = require("./instruction").Instruction

/**
 * Shift memory (MD) affectation MD := OF
 */
class AMD extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(7, 0, OD, OF, bullGamma)
  }

  execute() {
    this.bullGamma.md = this.OF;
  }

	getDescription() {
		return "AMD - Alteration de la Mémoire de Décalage\n"
		+ "Met la mémoire de décalage à " + this.OF;
	}
}

module.exports.AMD = AMD;
