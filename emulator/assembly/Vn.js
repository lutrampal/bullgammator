Instruction = require("./instruction").Instruction;
InvalidInstructionError = require("./instruction").InvalidInstructionError;
MethodNotImplementedError = require("./instruction").MethodNotImplementedError; // FIXME: remove
InvalidInstructionExecutionError = require("./instruction").InvalidInstructionExecutionError;
InvalidInstructionDescriptionError = require("./instruction").InvalidInstructionDescriptionError;
V = require("./V").V;

/**
 * Ecriture de Lettre
 */
class Vn extends V {
  constructor(AD, OD, OF, bullGamma) {
    if (AD > 7 || OF%4 < 2) {
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
  //   return "Vn";
  // }
  //
  // getLongType() {
  //   return "Variante";
  // }

}

module.exports.Vn = Vn;
