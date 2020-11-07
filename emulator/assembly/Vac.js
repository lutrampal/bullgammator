Instruction = require("./instruction").Instruction;
V = require("./V").V;

/**
 * Ecriture de Lettre
 */
class Vac extends V {
  constructor(AD, OD, OF, bullGamma) {
    if (AD < 9 || OF%4 < 2) {
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
  //   return "Vac";
  // }
  //
  // getLongType() {
  //   return "Variante";
  // }

}

module.exports.Vac = Vac;
