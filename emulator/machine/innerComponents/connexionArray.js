Serie = require("./serie").Serie;
NOP = require("../../assembly/NOP").NOP;

const NB_INST_CONNEXION_ARRAY = require("../constants").NB_INST_CONNEXION_ARRAY;

class ConnexionArray extends Serie{

  constructor(id, bullGamma) {
    super(id, bullGamma)
    this.maxNbInst = NB_INST_CONNEXION_ARRAY;
		this.instructions = [];
		this.completeInstructions();
  }

  setInstructions(hexCode) {
    let instructions = this.bullGamma.parser.parseInstructions(hexCode);
    if (instructions.length > NB_INST_CONNEXION_ARRAY) {
      throw "instructions number should not be greater than " + NB_INST_CONNEXION_ARRAY;
    }
    this.instructions = instructions;
		this.completeInstructions();
  }

	completeInstructions() {
		for (let i=this.instructions.length; i<this.maxNbInst; i++) {
			this.instructions.push(new NOP(this.bullGamma));
		}
		this.nbInst = this.instructions.length
	}

  getInstruction(line) {
    return this.instructions[line];
  }

  getInstructions() {
    return this.instructions;
  }
}

module.exports.ConnexionArray = ConnexionArray
