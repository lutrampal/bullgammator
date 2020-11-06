Instruction = require("./instruction").Instruction

/**
 * jump
 */
class V extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    if (AD > 4 || OF%4 > 1) {
      throw Error("Invalid or not implemented instruction 0" + Instruction.getChar(AD) + "x" + Instruction.getChar(OF));
    }
    super(0, AD, OD, OF, bullGamma);
  }

  execute() {
    let jump_cond_matrix = [[
      false,
      this.bullGamma.mc.isGreater(),
      this.bullGamma.mc.isEqual(),
      this.bullGamma.mc.isGreaterOrEqual(),
      this.bullGamma.ms1 === 10
    ], [
      true,
      this.bullGamma.mc.isLowerOrEqual(),
      this.bullGamma.mc.isNotEqual(),
      this.bullGamma.mc.isLower(),
      this.bullGamma.ms1 === 0
    ]]
    if (jump_cond_matrix[this.OF % 4][this.AD] === undefined) {
      throw Error("Jump condition does not exist or is not implemented");
    }
    if (jump_cond_matrix[this.OF%4][this.AD]) {
      this.bullGamma.nl = (this.OD << 2) + (this.OF >> 2);
    }
  }

  getDescription() {
    if (this.AD < 5 && this.OF % 4 < 2) {
      let action = "Saute à ligne " + ((this.OD << 2) + (this.OF >> 2))
      + " de la série courante";

      if (this.AD == 0 ) {
        if (this.OF % 4 == 0) {
          return "Ne fait rien";
        } else {
          return action;
        }
      } else if (this.AD == 4) {
        if (this.OF % 4 == 0) {
          return action + " si la mémoire de signe est négative";
        } else {
          return action + " si la mémoire de signe est positive";
        }
      } else {
        let jump_cond_matrix = [
          ["'supérieur'", "'égal'", "'supérieur ou égal'"],
          ["'inférieur ou égal'", "'différent'", "'inférieur'"],
        ]
        return action + " si la mémoire de décalage contient le resultat "
        + jump_cond_matrix[this.OF % 4][this.AD - 1];
      }
    }
    return "Instruction invalide ou non implémenté";
  }

  getShortType() {
    return "V";
  }

  getLongType() {
    return "Variante";
  }

}

module.exports.V = V;
