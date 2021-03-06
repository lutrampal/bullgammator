Operation = require("./operation").Operation;
InvalidInstructionError = require("./instruction").InvalidInstructionError;
InvalidInstructionExecutionError = require("./instruction").InvalidInstructionExecutionError;
InvalidInstructionDescriptionError = require("./instruction").InvalidInstructionDescriptionError;

/**
 * Memory reset
 */
class ZB extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    if (AD == 0) {
      throw new InvalidInstructionError("30xx");
    }
    super(3, AD, OD, OF, bullGamma);
  }

  execute() {
    if (this.AD != 0) {
      this.bullGamma.getMemory(this.AD).setToZero(this.OD, this.OF);
      return;
    }
    throw new InvalidInstructionExecutionError();
  }

  getDescription() {
    if (this.AD != 0) {
      return "Met à zéro M" + this.AD + " entre les positions "
      + this.OD + " et " + this.OF;
    }
    throw new InvalidInstructionDescriptionError();
  }

  getShortType() {
    return "ZB";
  }

  getLongType() {
    return "Mise à Zéro de mémoire Banale";
  }

}

module.exports.ZB = ZB;
