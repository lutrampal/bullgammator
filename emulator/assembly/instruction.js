assert = require("assert")

class Instruction {
  constructor(TO, AD, OD, OF, bullGamma) {
    assert(TO >= 0, "TO should not be negative");
    assert(AD >= 0, "AD should not be negative");
    assert(OD >= 0, "OD should not be negative");
    assert(OF >= 0, "OF should not be negative");
    assert(TO < 16, "TO should be inferior to 16");
    assert(AD < 16, "AD should be inferior to 16");
    assert(OD < 16, "OD should be inferior to 16");
    assert(OF < 16, "OF should be inferior to 16");
    assert(bullGamma, "a BullGamma instance should be provided");

    this.TO = TO;
    this.AD = AD;
    this.OD = OD;
    this.OF = OF;
    this.bullGamma = bullGamma;
    this.hexString = TO.toString(16) + AD.toString(16) + OD.toString(16) + OF.toString(16);
  }

  execute() {
    throw new Error('You have to implement the method execute.');
  }

  computeExeTime() {
    throw new Error('You have to implement the method computeExeTime.');
  }

	getDescription() {
		throw new Error('You have to implement the method getDescription.');
	}

  toString() {
    return this.hexString
  }

  toLineString() {
    return this.hexString + " -- " + this.constructor.name + "\n";
  }


}

module.exports.Instruction = Instruction;
