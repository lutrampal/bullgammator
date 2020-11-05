Instruction = require("./instruction").Instruction

/**
 * jump to another Series
 */
class VRS extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
		if (AD < 5 || AD > 7) {
			throw Error("Invalid instruction 1" + this.getChar(AD) + "xx");
		}
    super(1, AD, OD, OF, bullGamma);
  }

	execute() {
		switch (this.AD) {
			case 5:
				// wait for a drum transfer to finish if jumping to the same series
				// not implemented
				this.bullGamma.nl = this.bullGamma.rnl1 % 64;
				this.bullGamma.ns = this.bullGamma.rnl1 >> 6;
				break;
			case 6:
				// wait for a drum transfer to finish if jumping to the same series
				// not implemented
				this.bullGamma.nl = this.bullGamma.rnl2 % 64;
				this.bullGamma.ns = this.bullGamma.rnl2 >> 6;
				break;
			case 7:
				// complex behavior
				throw Error("Excution of instruction 17xx not implemented");
				break;
			default:
				throw Error("Cannot execute invalid instruction");
		}
	}

	getDescription() {
		switch (this.AD) {
			case 5:
				return "VRS - Variante Retour Serie\n"
				+ "Retourne à la ligne enregistrée en RNL1";
			case 6:
				return "VRS - Variante Retour Serie\n"
				+ "Retourne à la ligne enregistrée en RNL2";
			case 7:
				return "Instruction non implémentée";
			default:
				throw Error("Cannot describe invalid instruction");
		}
	}

	getShortType() {
		return "VRS";
	}

	getLongType() {
		return "Variante Retour Serie";
	}

}

module.exports.VRS = VRS;
