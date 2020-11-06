Serie = require("./serie").Serie;
NOP = require("../../assembly/NOP").NOP;

const NB_INST_CONNEXION_ARRAY = require("../constants").NB_INST_CONNEXION_ARRAY;

/**
 * Class which represents the connexion array of the Bull Gamma where plots would be connected by wires to hard code
 * programs. It contains 64 instructions and as such can be considered as a Series
 */
class ConnexionArray extends Serie {

  /**
   * Constructs a new instance of ConnexioArray
   * @param id the id for the extended Serie, should always be 3 to respect the physical architecture
   * @param bullGamma the bull gamma to which this array is connected
   */
  constructor(id, bullGamma) {
    super(id, bullGamma);
    this.maxNbInst = NB_INST_CONNEXION_ARRAY;
    this.instructions = [];
    this.completeInstructions();
  }

  /**
   * Set the ConnexionArray's content with hex values
   * @param hexCode a String that represents the new hex values of the array
   */
  setInstructions(hexCode) {
    let instructions = this.bullGamma.parser.parseInstructions(hexCode);
    if (instructions.length > NB_INST_CONNEXION_ARRAY) {
      throw "instructions number should not be greater than " + NB_INST_CONNEXION_ARRAY;
    }
    this.instructions = instructions;
    this.completeInstructions();
  }

  /**
   * fills up the empty instructions slots with NOP instructions
   */
  completeInstructions() {
    for (let i=this.instructions.length; i<this.maxNbInst; i++) {
      this.instructions.push(new NOP(this.bullGamma));
    }
    this.nbInst = this.instructions.length;
  }

  /**
   * @param line the position of the desired instructions
   * @returns {Instruction} the fetched instructions
   */
  getInstruction(line) {
    return this.instructions[line];
  }

  /**
   * @returns {Array|Instruction} all the instructions of the ConnexionArray
   */
  getInstructions() {
    return this.instructions;
  }

}

module.exports.ConnexionArray = ConnexionArray
