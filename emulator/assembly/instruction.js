const assert = require('../tools/assert');

/**
 * Abstract class meant to represent an Instruction, please refer to
 * http://aconit.org/histoire/Gamma-3/Articles/Gamma-Bolliet.pdf for further documentation about the specific
 * instructions behavior
 */
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

  /**
   * Abstract method, execute the instruction logic
   */
  execute() {
    throw Error('You have to implement the method execute.');
  }

  /**
   * Abstract method, return the execution time of this instruction
   */
  computeExeTime() {
    throw Error('You have to implement the method computeExeTime.');
  }

  /**
   * Abstract method, return the textual description of this instruction
   */
  getDescription() {
    throw Error('You have to implement the method getDescription.');
  }

  /**
   * Abstract method, return the short type name of this instruction
   */
  getShortType() {
    throw Error('You have to implement the method getShortType.');
  }

  /**
   * Abstract method, return the long type name of this instruction
   */
  getLongType() {
    throw Error('You have to implement the method getLongType.');
  }

  toString() {
    return this.hexString;
  }

  toLineString() {
    return this.hexString + " -- " + this.getShortType();
  }

  static getChar(intValue) {
    return intValue.toString(16).toUpperCase();
  }

}

module.exports.Instruction = Instruction;
