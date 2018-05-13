SmallDivOrMultOperation = require("./small_div_or_mult").SmallDivOrMult

class MR extends SmallDivOrMultOperation {
  constructor(AD, OD, OF, bullGamma) {
    super(12, AD, OD, OF, bullGamma)
  }

  _compute(mb) {
    this.bullGamma.getMemory(1).multiply(mb, this.OD, this.OF)
  }

  _computeValue() {
    this.bullGamma.getMemory(1).multiplyValue(this.OF, this.OD)
  }

	getDescription() {
		if (this.AD == 0) {
			return "Multipplie le nombre contenu dans M1 par " + this.OF
			+ " en position " + this.AD
			+ ", le résultat est en M1";
		} else if (this.AD > 2) {
			return "Multipplie le nombre contenu dans M1 par M" + this.AD
			+ " entre les positions " + this.OD + " et " + this.OF
			+ ", le résultat est en M1";
		} else {
			return "Instruction invalide";
		}
	}

}

module.exports.MR = MR
