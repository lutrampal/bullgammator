Instruction = require("./instruction").Instruction;
InvalidInstructionError = require("./instruction").InvalidInstructionError;
InvalidInstructionExecutionError = require("./instruction").InvalidInstructionExecutionError;
InvalidInstructionDescriptionError = require("./instruction").InvalidInstructionDescriptionError;

class ES extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    if (AD != 8 && AD != 9) {
      throw new InvalidInstructionError("1" + Instruction.getChar(AD) + "xx");
    }
    super(1, AD, OD, OF, bullGamma);
  }

  execute() {
    switch (this.AD) {
      case 8:
        for (let machine of this.bullGamma.connectedMachines) {
          machine.onStaticExtraction1(this.OD, this.OF);
        }
        break;
      case 9:
        for (let machine of this.bullGamma.connectedMachines) {
          machine.onStaticExtraction2(this.OD, this.OF);
        }
        break;
      default:
        throw new InvalidInstructionExecutionError();
    }
  }

  getDescription() {
    if (this.AD == 8 || this.AD == 9) {
      return "Envoie des données à une machine connectée";
    }
    throw new InvalidInstructionDescriptionError();
  }

  getShortType() {
    return "ES" + (this.AD - 7);
  }

  getLongType() {
    return "Extraction Statique";
  }

}

module.exports.ES = ES;
