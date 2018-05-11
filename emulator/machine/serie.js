assert = require('assert')

class Serie {
  constructor(id, bullGamma) {
    assert(id >= 0, "id should not be negative")
    assert(bullGamma, "bullGamma should neither be null nor undefined")
    this.id = id;
    this.bullGamma = bullGamma;
  }

  /**
   * Return the instruction at the given line, or null if not found
   * @param line programm line of the desired instruction
   */
  getInstruction(line) {
    throw new Error("You have to implement the method getInstruction(line)")
  }

  /**
   * Return the instructions list of the series
   */
  getInstructions() {
    throw new Error("You have to implement the method getInstructions()")
  }

  /**
   * Set the instruction of this Serie to match the given hexCode
   * @param hexCode a hex string representing instructions
   */
  setInstructions(hexCode) {
    throw new Error("You have to implement the method setInstructions(hexCode)")
  }
}

module.exports.Serie = Serie;
