BigDivOrMult = require("./big_div_or_mult").BigDivOrMult

class DC extends BigDivOrMult {
  constructor(AD, OD, OF, bullGamma) {
    super(15, AD, OD, OF, bullGamma)
  }

  _compute(m1m2, mb) {
    m1m2.divide(mb, this.OD, this.OF)
  }

  _computeValue(m1m2) {
    m1m2.divideValue(this.OF, this.OD)
  }

	getDescription() {
		if (this.AD == 0) {
			return "DC - Division Complète\n"
			+ "Divise le nombre contenu dans M1-M2 par " + this.OF
			+ " en position " + this.AD
			+ ", le quotient est calculé en M2 et le reste en M1-M2 en position MD ou 12 si MD vaut 0";
		} else if (this.AD > 2) {
			return "DC - Division Complète\n"
			+ "Divise le nombre contenu dans M1-M2 par M" + this.AD
			+ " entre les positions " + this.OD + " et " + this.OF
			+ ", le quotient est calculé en M2 et le reste en M1-M2 en position MD ou 12 si MD vaut 0";
		} else {
			return "Instruction invalide";
		}
	}
}

module.exports.DC = DC;
