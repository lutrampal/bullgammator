Instruction = require("./instruction").Instruction

class BD extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(7, 2, OD, OF, bullGamma)
  }

  execute() {
    this.bullGamma.md = this.bullGamma.getMemory(2).blocks[this.OD];
  }

	getDescription() {
		return "BD - transfert de mémoire Banale en mémoire de Décalage\n"
		+ "Met la valeur en position " + this.OD + " de M2 en mémoire de décalage";
	}
}

module.exports.BD = BD;
