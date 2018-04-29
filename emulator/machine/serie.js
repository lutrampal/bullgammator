class Serie {

  constructor(id, bullGamma) {
    this._id = id;
    this._bullGamma = bullGamma;
  }

  /**
   * Return the instruction at the given line, or null if not found
   * @param line programm line of the desired instruction
   */
  getInstruction(line) {
    return null;
  }

  /**
   * Return the instructions list of the series
   */
  getInstructions() {
    return [];
  }
}

module.exports.Serie = Serie;
