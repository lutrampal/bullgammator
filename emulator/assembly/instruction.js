export class Instruction {
  constructor(TO, AD, OD, OF, bullGamma) {
    this.TO = TO;
    this.AD = AD;
    this.OD = OD;
    this.OF = OF;
    this.bullGamma = bullGamma;
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