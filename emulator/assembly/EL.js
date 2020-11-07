Instruction = require("./instruction").Instruction;
InvalidInstructionError = require("./instruction").InvalidInstructionError;
MethodNotImplementedError = require("./instruction").MethodNotImplementedError; // FIXME: remove
InvalidInstructionExecutionError = require("./instruction").InvalidInstructionExecutionError;
InvalidInstructionDescriptionError = require("./instruction").InvalidInstructionError;
V = require("./V").V;

/**
 * Ecriture de Lettre
 */
class EL extends V {
  constructor(AD, OD, OF, bullGamma) {
    if (AD < 8 || OF%4 > 1) {
      throw new InvalidInstructionError("0" + Instruction.getChar(AD) + "x" + Instruction.getChar(OF));
    }
    super(AD, OD, OF, bullGamma);
  }

  execute() {
    throw new MethodNotImplementedError("execute");
  }

  getDescription() {
    throw new MethodNotImplementedError("getDescription");
  }

  // getShortType() {
  //   return "EL";
  // }
  //
  // getLongType() {
  //   return "Variante";
  // }

}

module.exports.EL = EL;
