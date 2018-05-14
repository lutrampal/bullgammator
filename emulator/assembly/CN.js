OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class CN extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(9, AD, OD, OF, bullGamma)
  }

  _exeInstructionLogic() {
    let m1 = this.bullGamma.getMemory(1);
    if (this.AD === 0) {
      let vm1 = m1.getDecimalValue(0, m1.blocks.length)
      this.bullGamma.mc.greater = vm1 > this.OF*(10**this.OD)
      this.bullGamma.mc.equal = vm1 === this.OF*(10**this.OD);
    } else {
      let cmpRes = m1.compareTo(this.bullGamma.getMemory(this.AD), this.OD, this.OF)
      this.bullGamma.mc.greater = cmpRes[0]
      this.bullGamma.mc.equal = cmpRes[1]
    }
  }

	getDescription() {
		if (this.AD == 0) {
			return "CN - Comparaison\n"
			+ "Effectue le décalage de M1 puis compare le contenu de M1 à "
			+ this.OF + " en position " + this.OD
			+ ", met le résultat en mémoire de comparaison";
		} else {
			return "CN - Comparaison\n"
			+ "Effectue le décalage de M1 puis compare le contenu de M1 à celui de M"
			+ this.AD + " entre les positions " + this.OD + " et " + this.OF
			+ ", met le résultat en mémoire de comparaison";
		}
	}
}

module.exports.CN = CN;
