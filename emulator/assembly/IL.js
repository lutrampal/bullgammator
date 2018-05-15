Operation = require("./operation").Operation
assert = require('assert');

class IL extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(7, AD, OD, OF, bullGamma)
  }

	execute() {
		let m1 = this.bullGamma.getMemory(1);
		if (this.AD == 10) {
			m1.blocks = m1.blocks.map((v) => (v & this.OF));
		} else if (this.AD == 12) {
			let m2 = this.bullGamma.getMemory(2);
			assert(m1.blocks.length == m2.blocks.length,
				"M1 and M2 should be of same length");
			for (let i=0; i<m1.blocks.length; i++) {
				m1.blocks[i] = m1.blocks[i] & m2.blocks[i];
			}
		} else {
			throw "incorrect instruction for IL: got AD = " + this.AD;
		}
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
