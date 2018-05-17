OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class CN extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(9, AD, OD, OF, bullGamma)
  }

  _exeInstructionLogic() {
    let m1 = this.bullGamma.getMemory(1);
		let base = this.bullGamma.getMemoryMode().base;
    let vm1 = m1.getDecimalValue(0, m1.blocks.length);
    if (this.AD === 0) {
      this.bullGamma.mc.greater = vm1 > this.OF * (base ** this.OD);
      this.bullGamma.mc.equal = vm1 == this.OF * (base ** this.OD);
    } else {
      let valMb = this.bullGamma.getMemory(this.AD).getDecimalValue(this.OD, this.OF);
      valMb *= base ** this.OD;
      this.bullGamma.mc.greater = vm1 > valMb;
      this.bullGamma.mc.equal = vm1 == valMb;
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
