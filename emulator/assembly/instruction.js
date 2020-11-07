const assert = require('../tools/assert');


class InvalidInstructionError extends Error {
  constructor(instruction) {
    super("Invalid instruction " + instruction + ".");
  }
}

class InvalidInstructionExecutionError extends Error {
  constructor() {
    super("Cannot execute invalid instruction.");
  }
}

class InvalidInstructionDescriptionError extends Error {
  constructor() {
    super("Cannot describe invalid instruction.");
  }
}

class MethodNotImplementedError extends Error {
  constructor(method) {
    super("You have to implement the method '" + method + "'.");
  }
}

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
    this.hexString = this.getHexCode(TO, AD, OD, OF);
  }

  /**
   * Abstract method, execute the instruction logic
   */
  execute() {
    throw new MethodNotImplementedError("execute");
  }

  /**
   * Abstract method, return the execution time of this instruction
   */
  computeExeTime() {
    throw new MethodNotImplementedError("computeExeTime");
  }

  /**
   * Abstract method, return the textual description of this instruction
   */
  getDescription() {
    throw new MethodNotImplementedError("getDescription");
  }

  /**
   * Abstract method, return the short type name of this instruction
   */
  getShortType() {
    throw new MethodNotImplementedError("getShortType");
  }

  /**
   * Abstract method, return the long type name of this instruction
   */
  getLongType() {
    throw new MethodNotImplementedError("getLongType");
  }

  toString() {
    return this.hexString;
  }

  toLineString() {
    return this.hexString + " -- " + this.getShortType();
  }

  static getChar(intValue) {
    return intValue.toString(16); // NB: toString(16) generates lower case
  }

  getHexCode(TO, AD, OD, OF) {
    return Instruction.getChar(TO) + Instruction.getChar(AD) + Instruction.getChar(OD) + Instruction.getChar(OF);
  }

}

module.exports.Instruction = Instruction;
module.exports.InvalidInstructionError = InvalidInstructionError;
module.exports.InvalidInstructionExecutionError = InvalidInstructionExecutionError;
module.exports.InvalidInstructionDescriptionError = InvalidInstructionDescriptionError;
module.exports.MethodNotImplementedError = MethodNotImplementedError;
