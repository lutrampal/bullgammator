Instruction = require("./instruction").Instruction;
V = require("./V").V;

/**
 * Ecriture de Lettre
 */
class EL extends V {
  constructor(AD, OD, OF, bullGamma) {
    if (AD < 8 || OF%4 > 1) {
      throw Error("Invalid instruction 0" + Instruction.getChar(AD) + "x" + Instruction.getChar(OF));
    }
    super(AD, OD, OF, bullGamma);
  }

  execute() {
    throw Error("Not implemented instruction.");
  }

  getDescription() {
    throw Error("Instruction non implémentée.");
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
