Instruction = require("./instruction").Instruction;
InvalidInstructionError = require("./instruction").InvalidInstructionError;
InvalidInstructionExecutionError = require("./instruction").InvalidInstructionExecutionError;
InvalidInstructionDescriptionError = require("./instruction").InvalidInstructionDescriptionError;
NB_OCTADS_PER_GROUP = require("../machine/constants").NB_OCTADS_PER_GROUP;
NB_MEMORIES_PER_OCTAD = require("../machine/constants").NB_MEMORIES_PER_OCTAD;

/**
 * Group to Group transfer
 */
class GG extends Instruction {
  constructor(OD, OF, bullGamma) {
    if ((OD > 3 && OD < 8) || OF > 3) {
      throw new InvalidInstructionError("50" + Instruction.getChar(OD) + Instruction.getChar(OF));
    }
    super(5, 0, OD, OF, bullGamma);
  }

  execute() {
    if (this.OD >= 8 && this.OF < 4) {
      this.bullGamma.getGroup(this.OF).setContent("");
      return;
    }
    if (this.OD < 4 && this.OF < 4) {
      let gsrc = this.bullGamma.getGroup(this.OD);
      let gdest = this.bullGamma.getGroup(this.OF);
      for (let i=0; i<NB_OCTADS_PER_GROUP*NB_MEMORIES_PER_OCTAD; i++) {
        gdest.getWord(i).copy(gsrc.getWord(i));
      }
      return;
    }
    throw new InvalidInstructionExecutionError();
  }

  getDescription() {
    if (this.OD >= 8 && this.OF < 4) {
      return "Met à 0 les octades " + (this.OF << 1) + " et " + ((this.OF << 1) | 0x1);
    }
    if (this.OD < 4 && this.OF < 4) {
      return "Copie le contenu des octades " + ((this.OD & 0x7) << 1) + " et " + (((this.OD & 0x7) << 1) | 0x1)
      + " dans les octades " + ((this.OF & 0x7) << 1) + " et " + (((this.OF & 0x7) << 1) | 0x1);
    }
    throw new InvalidInstructionDescriptionError();
  }

  getShortType() {
    return "GG";
  }

  getLongType() {
    return "Groupe - Groupe";
  }
}

module.exports.GG = GG;
