Instruction = require("./instruction").Instruction

/**
 * octad selection
 */
class CO extends Instruction {
  constructor(OD, OF, bullGamma) {
    if (OF > 7) {
      throw Error("Invalid instruction 1C0" + this.getChar(OF));
    }
    super(1, 12, OD, OF, bullGamma);
  }

  execute() {
		if (this.OF < 8) {
			this.bullGamma.setCommutedOctad(this.OF);
			return;
		}
		throw Error("Cannot execute invalid instruction");
  }

	getDescription() {
		if (this.OF < 8) {
			return "Selectionne l'octade commutée " + this.OF;
		}
		throw Error("Cannot describe invalid instruction");
	}

	getShortType() {
		return "CO";
	}

	getLongType() {
		return "Commutation d'Octade";
	}

}

module.exports.CO = CO;
