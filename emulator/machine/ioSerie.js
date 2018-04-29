Serie = require("./serie").Serie;

const NB_INST_IOSERIES = require("./constants").NB_INST_IOSERIES;

class IOSerie extends Serie {
  constructor(id, bullGamma) {
    super(id, bullGamma);
    this.lineOffset = 0;
    this.nbInst = 0;
    this.maxNbInst = NB_INST_IOSERIES;
  }

  setInstructions(hexCode) {
    let instructions = this._bullGamma.parser.parseInstructions(hexCode);
    if (instructions.length > NB_INST_IOSERIES) {
      throw "instructions number should not be greater than " + NB_INST_IOSERIES;
    }
    this.instructions = instructions;
    this.nbInst = instructions.length;
  }

  getInstruction(line) {
    let index = line - this.lineOffset;
    return this.instructions[index];
  }

  getInstructions() {
    return this.instructions;
  }
}

module.exports.IOSerie = IOSerie;
