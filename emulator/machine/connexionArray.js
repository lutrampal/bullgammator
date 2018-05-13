Serie = require("./serie").Serie

const NB_INST_CONNEXION_ARRAY = require("./constants").NB_INST_CONNEXION_ARRAY;

class ConnexionArray extends Serie{

  constructor(id, bullGamma) {
    super(id, bullGamma)
    this.nbInst = 0;
    this.maxNbInst = NB_INST_CONNEXION_ARRAY;
  }

  setInstructions(hexCode) {
    let instructions = this.bullGamma.parser.parseInstructions(hexCode);
    if (instructions.length > NB_INST_CONNEXION_ARRAY) {
      throw "instructions number should not be greater than " + NB_INST_CONNEXION_ARRAY;
    }
    this.instructions = instructions;
    this.nbInst = instructions.length
  }

  getInstruction(line) {
    return this.instructions[line];
  }

  getInstructions() {
    return this.instructions;
  }
}

module.exports.ConnexionArray = ConnexionArray
