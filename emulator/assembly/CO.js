Instruction = require("./instruction").Instruction

class CO extends Instruction {
  constructor(OF, bullGamma) {
    super(1, 12, 0, OF, bullGamma)
  }

  execute() {
    if (this.OF > 7) {
      throw "incorrect instruction for TO = 1, AD = C: got OF = " + OF;
    }
    this.bullGamma.setCommutedOctad(this.OF);
  }

	getDescription() {
		return "CO - Commutation d'Octade\n"
		+ "Selectionne l'octade commutée " + this.OF;
	}
}

module.exports.CO = CO;
