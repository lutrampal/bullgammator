Instruction = require("./instruction").Instruction;
InvalidInstructionError = require("./instruction").InvalidInstructionError;
InvalidInstructionExecutionError = require("./instruction").InvalidInstructionExecutionError;
InvalidInstructionDescriptionError = require("./instruction").InvalidInstructionDescriptionError;

/**
 * octad selection
 */
class CO extends Instruction {
  constructor(OD, OF, bullGamma) {
    if (OF > 7) {
      throw new InvalidInstructionError("1c0" + this.getChar(OF));
    }
    super(1, 12, OD, OF, bullGamma);
  }

  execute() {
    if (this.OF < 8) {
      this.bullGamma.setCommutedOctad(this.OF);
      return;
    }
    throw new InvalidInstructionExecutionError();
  }

  getDescription() {
    if (this.OF < 8) {
      return "Selectionne l'octade commutée " + this.OF;
    }
    throw new InvalidInstructionDescriptionError();
  }

  getShortType() {
    return "CO";
  }

  getLongType() {
    return "Commutation d'Octade";
  }

}

module.exports.CO = CO;
