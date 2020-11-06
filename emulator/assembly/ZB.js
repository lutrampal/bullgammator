Operation = require("./operation").Operation

/**
 * Memory reset
 */
class ZB extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    if (AD == 0) {
      throw Error("Invalid instruction 30xx");
    }
    super(3, AD, OD, OF, bullGamma);
  }

  execute() {
    if (this.AD != 0) {
      this.bullGamma.getMemory(this.AD).setToZero(this.OD, this.OF);
      return;
    }
    throw Error("Cannot execute invalid instruction");
  }

  getDescription() {
    if (this.AD != 0) {
      return "Met à zéro M" + this.AD + " entre les positions "
      + this.OD + " et " + this.OF;
    }
    throw Error("Cannot describe invalid instruction");
  }

  getShortType() {
    return "ZB";
  }

  getLongType() {
    return "Mise à Zéro de mémoire Banale";
  }

}

module.exports.ZB = ZB;
