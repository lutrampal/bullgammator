SmallDivOrMult = require("./small_div_or_mult").SmallDivOrMult

/**
 * Reduced Division
 */
class DR extends SmallDivOrMult {
  constructor(AD, OD, OF, bullGamma) {
		if (AD == 1) {
			throw Error("Invalid instruction D1xx");
		}
    super(13, AD, OD, OF, bullGamma);
  }

  _compute(mb) {
    this.bullGamma.getMemory(1).divide(mb, this.OD, this.OF);
  }

  _computeValue() {
    this.bullGamma.getMemory(1).divideValue(this.OF, this.OD);
  }

	getDescription() {
		if (this.AD == 0) {
			return "DR - Division Réduite\n"
			+ "Divise le nombre contenu dans M1 par " + this.OF
			+ " en position " + this.AD
			+ ", le quotient est en M1 en position 0 et le reste en position MD";
		}
		if (this.AD > 1) {
			return "DR - Division Réduite\n"
			+ "Divise le nombre contenu dans M1 par M" + this.AD
			+ ", le quotient est en M1 en position 0 et le reste en position MD";
		}
		throw Error("Cannot describe invalid instruction");
	}

	getShortType() {
		return "DR";
	}

	getLongType() {
		return "Division Réduite";
	}

}

module.exports.DR = DR
