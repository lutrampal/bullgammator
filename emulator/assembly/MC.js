BigDivOrMult = require("./big_div_or_mult").BigDivOrMult
Memory = require("../machine/innerComponents/memory").Memory
NB_CHRS_PER_WORD = require("../machine/constants").NB_CHRS_PER_WORD

/**
 * complete multiplication
 */
class MC extends BigDivOrMult {
  constructor(AD, OD, OF, bullGamma) {
		if (AD == 1 || AD == 2) {
			throw Error("Invalid instruction E" + Instruction.getChar(AD) + "xx");
		}
    super(14, AD, OD, OF, bullGamma);
  }

  _compute(m1m2, mb) {
    m1m2.multiply(mb, this.OD, this.OF)
  }

  _computeValue(m1m2) {
  	if (this.OF !== 0) {
  	  this.bullGamma.md = NB_CHRS_PER_WORD;
    }
    m1m2.multiplyValue(this.OF, this.OD + NB_CHRS_PER_WORD);
  }

	getDescription() {
		if (this.AD == 0) {
			return "Multipplie le nombre contenu dans M1 par " + this.OF
			+ " en position " + this.AD
			+ ", le résultat est en M1-M2";
		}
		if (this.AD > 2) {
			return "Multipplie le nombre contenu dans M1 par  M" + this.AD
			+ " entre les positions " + this.OD + " et " + this.OF
			+ ", le résultat est en M1-M2";
		}
		throw Error("Cannot describe invalid instruction");
	}

	getShortType() {
		return "MC";
	}

	getLongType() {
		return "Multiplication Complète";
	}
}

module.exports.MC = MC;
