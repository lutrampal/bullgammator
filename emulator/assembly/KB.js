Instruction = require("./instruction").Instruction

class KB extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(4, AD, OD, OF, bullGamma)
  }

  execute() {
		if (this.AD == 0) {
			for (let machine of this.bullGamma.connectedMachines) {
				machine.on48V();
			}
		} else {
			this.bullGamma.getMemory(this.AD).setBlockValue(this.OD, this.OF);
		}
  }

	getDescription() {
		if (this.AD == 0) {
			return "Emission de 48V";
		} else {
			return "KB - transfert d'une Constante en mémoire Banale\n"
			+ "Ecrit la constante " + this.OF + " en position " + this.OD
			+ " de M" + this.AD;
		}
	}

}

module.exports.KB = KB;
