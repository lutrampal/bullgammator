Instruction = require("./instruction").Instruction

class VRS extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
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
				throw "not implemented for AD = " + this.AD;
				break;
			default:
				throw "Invalid value for AD: " + this.AD;
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
				return "Instruction invalide";
		}
	}
}

module.exports.VRS = VRS;
