class Instruction {
  constructor(TO, AD, OD, OF, bullGamma) {
    if (OD >= OF) {
      OF = 12;
    }
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