assert = require('assert');

Serie = require("./serie").Serie;
NOP = require("../assembly/NOP").NOP;
const NB_INST_IOSERIES = require("./constants").NB_INST_IOSERIES;

const NB_MEMORIES_PER_SERIES = require("./constants").NB_MEMORIES_PER_SERIES;
const NB_INST_PER_MEM = require("./constants").NB_INST_PER_MEM;
const NB_INST_PER_SERIES = require("./constants").NB_INST_PER_SERIES;

class GeneralSerie extends Serie {
  constructor(id, memories, bullGamma) {
    assert.equal(id >= 0, true, "id should not be negative");
    assert.equal(memories.length == NB_MEMORIES_PER_SERIES, true,
      "series shoud have " + NB_MEMORIES_PER_SERIES + " memories");
    super(id, bullGamma);
    this._memories = memories;
    this.lineOffset = NB_INST_IOSERIES + id * NB_INST_PER_SERIES;
    this.nbInst = NB_INST_PER_SERIES;
    this.maxNbInst = NB_INST_PER_SERIES;
  }

  getInstruction(line) {
    var index = line - this.lineOffset;
    assert.equal(index >= 0 && index < this.nbInst, true, "invalid instruction index");
    var q = Math.floor(index / NB_INST_PER_MEM);
    var r = index % NB_INST_PER_MEM;

    // blanck linne every 3 instructions
    if (r == NB_INST_PER_MEM - 1) {
      return new NOP(this._bullGamma);
    }

    var mem = this._memories[q];
    var TO = mem.blocks[4 * r + 3];
    var AD = mem.blocks[4 * r + 2];
    var OD = mem.blocks[4 * r + 1];
    var OF = mem.blocks[4 * r + 0];

    // try to compute an instruction, else return nop as an instruction
    // that do not have implementation
    try {
      return this._bullGamma.parser.parseInstruction(TO, AD, OD, OF);
    } catch (error) {
      return new NOP(this._bullGamma);
    }
  }

  getInstructions() {
    var list = []
    for (var i=0; i<this.nbInst; i++) {
      list.push(this.getInstruction(i + this.lineOffset));
    }
    return list;
  }
}

module.exports.GeneralSerie = GeneralSerie;
