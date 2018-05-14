OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift
const MEMORY_MODE = require("../machine/constants").MEMORY_MODE;

class OB extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(8, AD, OD, OF, bullGamma)
  }

  _exeInstructionLogic() {
    let m1 = this.bullGamma.getMemory(1)
    if (this.AD !== 1){
      let mb = this.bullGamma.getMemory(this.AD)
      mb.copyBlockValues(m1, this.OD, this.OF)
      if (mb.blocks[this.OF - 1] === 0) {
        mb.blocks[this.OF - 1] = this.bullGamma.ms1
      }
    } else {
      m1.setToZero(this.OD, this.OF)
    }
  }

	getDescription() {
		if (this.AD == 1) {
			return "OB - transfert de mémoire Opérateur en mémoire Banale\n"
			+ "Met M1 à zéro entre les position " + this.OD + " et " + this.OF;
		} else if (this.AD > 1) {
			return "OB - transfert de mémoire Opérateur en mémoire Banale\n"
			+ "Effectue le décalage de M1 puis copie M1 entre les positions "
			+ this.OD + " et " + this.OF + " en M" + this.AD + " aux mêmes positions";
		} else {
			return "Instruction invalide";
		}
	}
}

module.exports.OB = OB;
