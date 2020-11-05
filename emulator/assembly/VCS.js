Instruction = require("./instruction").Instruction

/**
 * jump to another Series
 */
class VCS extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
		if (AD > 3) {
			throw Error("Invalid instruction 1" + Instruction.getChar(AD) + "xx");
		}
    super(1, AD, OD, OF, bullGamma);
  }

	execute() {
		switch (this.AD) {
			case 0:
				// wait systematicaly for a drum transfer to finish
				// Not implemented
				break;
			case 1:
				// wait for a drum transfer to finish if jumping to the same series
				// not implemented
				this.bullGamma.rnl1 = (this.bullGamma.ns << 6) + this.bullGamma.nextLine();
				break;
			case 2:
				// wait for a drum transfer to finish if jumping to the same series
				// not implemented
				this.bullGamma.rnl2 = (this.bullGamma.ns << 6) + this.bullGamma.nextLine();
				break;
			case 3:
				// wait for a drum transfer to finish if jumping to the same series
				// not implemented
				break;
			default:
				throw Error("Cannot execute invalid instruction");
		}
		this.bullGamma.ns = this.OF % 4;
		this.bullGamma.nl = (this.OD << 2) + (this.OF >> 2);
	}

	getDescription() {
		let action = "Saute à la ligne " + ((this.OD << 2) + (this.OF >> 2))
		+ " de la série " + (this.OF % 4);

		switch (this.AD) {
			case 0:
				return action;
			case 1:
				return action + " et retient la ligne de laquelle on saute + 1 en RNL1";
			case 2:
				return action + " et retient la ligne de laquelle on saute + 1 en RNL2";
			case 3:
				return action;
			default:
				throw Error("Cannot describe invalid instruction");
		}
	}

	getShortType() {
		return "VCS";
	}

	getLongType() {
		return "Variante Changement de Serie";
	}

}

module.exports.VCS = VCS;
