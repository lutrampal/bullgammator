Operation = require("./operation").Operation

/**
 * Memory reset
 */
class ZB extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(3, AD, OD, OF, bullGamma)
  }

  execute() {
    if (this.AD === 0) {
			throw "Invalid value for AD: " + this.AD;
    }
    this.bullGamma.getMemory(this.AD).setToZero(this.OD, this.OF);
  }

	getDescription() {
    if (this.AD == 0) {
			return "Instruction invalide";
    } else {
			return "ZB - mise à Zéro de mémoire Banale\n"
			+ "Met à zéro M" + this.AD + " entre les positions "
			+ this.OD + " et " + this.OF;
		}
	}
}

module.exports.ZB = ZB;
