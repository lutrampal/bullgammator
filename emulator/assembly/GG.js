Operation = require("./operation").Operation

class GG extends Operation {
  constructor(OD, OF, bullGamma) {
    super(5, 0, OD, OF, bullGamma)
  }

	getDescription() {
		// FIXME: doc interpretation could be wrong
		if (this.OD >= 8) {
			return "Met à 0 les octades " + (this.OF << 1) + " et " + ((this.OF << 1) | 0x1);
		}
		if (this.OD < 8 && this.OD > 3 || this.OF < 8 && this.OF > 3) {
			return "Instruction invalide";
		}
		return "Copie le contenu des octades " + ((this.OD & 0x7) << 1) + " et " + (((this.OD & 0x7) << 1) | 0x1)
		+ " dans les octades " + ((this.OF & 0x7) << 1) + " et " + (((this.OF & 0x7) << 1) | 0x1);
	}
}

module.exports.GG = GG;
