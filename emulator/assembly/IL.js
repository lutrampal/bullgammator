Operation = require("./operation").Operation;
const assert = require('../tools/assert');
InvalidInstructionError = require("./instruction").InvalidInstructionError;
InvalidInstructionExecutionError = require("./instruction").InvalidInstructionExecutionError;
InvalidInstructionDescriptionError = require("./instruction").InvalidInstructionDescriptionError;

/**
 * Logical intersection instruction
 */
class IL extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    if (AD != 10 && AD != 12) {
      throw new InvalidInstructionError("7" + Instruction.getChar(AD) + "xx");
    }
    super(7, AD, OD, OF, bullGamma);
  }

  execute() {
    let m1 = this.bullGamma.getMemory(1);
    if (this.AD == 10) {
      m1.blocks = m1.blocks.map((v) => (v & this.OF));
      return;
    }
    if (this.AD == 12) {
      let m2 = this.bullGamma.getMemory(2);
      assert(
        m1.blocks.length == m2.blocks.length,
        "M1 and M2 should be of same length"
      );
      for (let i=0; i<m1.blocks.length; i++) {
        m1.blocks[i] = m1.blocks[i] & m2.blocks[i];
      }
      return;
    }
    throw new InvalidInstructionExecutionError();
  }

  getDescription() {
    if (this.AD == 10) {
      return "Calcule un 'et' logique entre chaque position de M1 et " + this.OF;
    }
    if (this.AD == 12) {
      return "Calcule un 'et' logique entre M1 et M2";
    }
    throw new InvalidInstructionDescriptionError();
  }

  getShortType() {
    return "IL";
  }

  getLongType() {
    return "Intersection Logique";
  }
}

module.exports.IL = IL;
