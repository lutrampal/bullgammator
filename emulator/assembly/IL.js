Operation = require("./operation").Operation

class IL extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(7, AD, OD, OF, bullGamma)
  }

	getDescription() {
		if (this.AD == 10) {
			return "IL - Intersection Logique\n"
			+ "Calcule un 'et' logique entre chaque position de M1 et " + this.OF;
		} else if (this.AD == 12) {
			return "IL - Intersection Logique\n"
			+ "Calcule un 'et' logique entre M1 et M2"
		}
		return "Instruction invalide";
	}
}

module.exports.IL = IL;
