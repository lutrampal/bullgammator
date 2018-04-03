class Instruction {
  constructor(TO, AD, OD, OF, bullGamma) {
    assert(TO >= 0, true, "TO should not be negative");
    assert(AD >= 0, true, "AD should not be negative");
    assert(OD >= 0, true, "OD should not be negative");
    assert(OF >= 0, true, "OF should not be negative");
    assert(TO < 16, true, "TO should be inferior to 16");
    assert(AD < 16, true, "AD should be inferior to 16");
    assert(OD < 16, true, "OD should be inferior to 16");
    assert(OF < 16, true, "OF should be inferior to 16");
    assert(bullGamma, true, "a BullGamma instance should be provided");

    this.TO = TO;
    this.AD = AD;
    this.OD = OD;
    this.OF = OF;
    this.bullGamma = bullGamma;
  }

  execute() {
    throw new Error('You have to implement the method execute.');
  }

  computeExeTime() {
    throw new Error('You have to implement the method computeExeTime.');
  }

  toString() {
    return this.TO.toString(16) + this.AD.toString(16)
      + this.OD.toString(16) + this.OF.toString(16);
  }

  toLineString() {
    return this.TO.toString(16) + this.AD.toString(16)
      + this.OD.toString(16) + this.OF.toString(16)
      + " -- " + this.constructor.name + "\n";
  }
}

module.exports.Instruction = Instruction;