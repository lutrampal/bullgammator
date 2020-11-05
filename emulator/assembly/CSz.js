Instruction = require("./instruction").Instruction

/**
 * Magnetic drum track group selection
 */
class CSz extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(1, 13, OD, OF, bullGamma);
  }

  execute() {
    this.bullGamma.magneticDrum.setCommutedGroup(this.OF & 0x7);
  }

	getDescription() {
		return "Selectionne la seizaine commutée " + (this.OF & 0x7) + " du tambour";
	}

	getShortType() {
		return "CSz";
	}

	getLongType() {
		return "Commutation de Seizaine";
	}

}

module.exports.CSz = CSz;
