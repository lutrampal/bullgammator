OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift
const MEMORY_MODE = require("../machine/constants").MEMORY_MODE;

/**
 * M1 to MB transfer
 */
class OB extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
		if (AD == 0) {
			throw Error("Invalid instruction 80xx");
		}
    super(8, AD, OD, OF, bullGamma);
  }

  _exeInstructionLogic() {
    let m1 = this.bullGamma.getMemory(1);
		if (this.AD == 1) {
			m1.setToZero(this.OD, this.OF);
			return;
		}
    if (this.AD > 1){
      let mb = this.bullGamma.getMemory(this.AD);
      mb.copyBlockValues(m1, this.OD, this.OF);
      if (mb.blocks[this.OF - 1] === 0) {
        mb.blocks[this.OF - 1] = this.bullGamma.ms1;
      }
			return;
    }
		throw Error("Cannot execute invalid instruction");
  }

	getDescription() {
		if (this.AD == 1) {
			return "Met M1 à zéro entre les position " + this.OD + " et " + this.OF;
		}
		if (this.AD > 1) {
			return "Effectue le décalage de M1 puis copie M1 entre les positions "
			+ this.OD + " et " + this.OF + " en M" + this.AD + " aux mêmes positions";
		}
		throw Error("Cannot describe invalid instruction");
	}

	getShortType() {
		return "OB";
	}

	getLongType() {
		return "Transfert de mémoire Opérateur en mémoire Banale";
	}
}

module.exports.OB = OB;
