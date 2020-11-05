BigDivOrMult = require("./big_div_or_mult").BigDivOrMult
NB_CHRS_PER_WORD = require("../machine/constants").NB_CHRS_PER_WORD

/**
 * Complete Division
 */
class DC extends BigDivOrMult {
  constructor(AD, OD, OF, bullGamma) {
		if (AD == 1 || AD == 2) {
			throw Error("Invalid instruction F" + Instruction.getChar(AD) + "xx");
		}
    super(15, AD, OD, OF, bullGamma);
  }

  _compute(m1m2, mb) {
    m1m2.divide(mb, this.OD, this.OF)
  }

  _computeValue(m1m2) {
  	if (this.OF === 1 ) {
      while (this.bullGamma.md > 0) {
        // OD is ignored as of now
      	m1m2.shiftLeft();
        this.bullGamma.md--;
			}
		} else {
      this.bullGamma.md = NB_CHRS_PER_WORD;
      m1m2.divideValue(this.OF, this.OD);
		}
  }

	getDescription() {
		if (this.AD == 0) {
			return "DC - Division Complète\n"
			+ "Divise le nombre contenu dans M1-M2 par " + this.OF
			+ " en position " + this.AD
			+ ", le quotient est calculé en M2 et le reste en M1-M2 en position MD ou 12 si MD vaut 0";
		}
		if (this.AD > 2) {
			return "DC - Division Complète\n"
			+ "Divise le nombre contenu dans M1-M2 par M" + this.AD
			+ " entre les positions " + this.OD + " et " + this.OF
			+ ", le quotient est calculé en M2 et le reste en M1-M2 en position MD ou 12 si MD vaut 0";
		}
		throw Error("Cannot describe invalid instruction");
	}

	getShortType() {
		return "DC";
	}

	getLongType() {
		return "Division Complète";
	}
}

module.exports.DC = DC;
