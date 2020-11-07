Serie = require("./serie").Serie;
NOP = require("../../assembly/NOP").NOP;

const NB_INST_SERIES_3 = require("../constants").NB_INST_SERIES_3;

/**
 * Class which represents the connexion array of the Bull Gamma where plots would be connected by wires to hard code
 * programs. It contains 64 instructions and as such can be considered as a Series
 */
class Series3 extends Serie {

  /**
   * Constructs a new instance of ConnexioArray
   * @param id the id for the extended Serie, should always be 3 to respect the physical architecture
   * @param bullGamma the bull gamma to which this array is connected
   */
  constructor(id, bullGamma) {
    super(id, bullGamma);
    this.maxNbInst = NB_INST_SERIES_3;
    this.setInstructions("");
  }

  /**
   * Set the Series3's content with hex values
   * @param hexCode a String that represents the new hex values of the array
   */
  setInstructions(hexCode) {
    this.instructions = this.bullGamma.parser.parseInstructions(hexCode, NB_INST_SERIES_3);
  }

  /**
   * @param line the position of the desired instructions
   * @returns {Instruction} the fetched instructions
   */
  getInstruction(line) {
    return this.instructions[line];
  }

  /**
   * @returns {Array|Instruction} all the instructions of the Series3
   */
  getInstructions() {
    return this.instructions;
  }

}

module.exports.Series3 = Series3;
