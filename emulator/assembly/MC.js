BigDivOrMult = require("./big_div_or_mult").BigDivOrMult
Memory = require("../machine/memory").Memory
NB_CHRS_PER_WORD = require("../machine/constants").NB_CHRS_PER_WORD

class MC extends BigDivOrMult {
  constructor(AD, OD, OF, bullGamma) {
    super(14, AD, OD, OF, bullGamma)
  }

  _compute(m1m2, mb) {
    m1m2.multiply(mb, this.OD, this.OF)
  }

  _computeValue(m1m2) {
    m1m2.multiplyValue(this.OF, this.OD + NB_CHRS_PER_WORD)
  }

	getDescription() {
		if (this.AD == 0) {
			return "Multipplie le nombre contenu dans M1 par " + this.OF
			+ " en position " + this.AD
			+ ", le résultat est en M1-M2";
		} else if (this.AD > 2) {
			return "Multipplie le nombre contenu dans M1 par  M" + this.AD
			+ ", le résultat est en M1-M2";
		} else {
			return "Instruction invalide";
		}
	}
}

module.exports.MC = MC;
