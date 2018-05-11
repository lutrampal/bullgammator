assert = require('assert');

Serie = require("./serie").Serie;
Octad = require("./octad").Octad;

NOP = require("../assembly/NOP").NOP;

const NB_INST_CONNEXION_ARRAY = require("./constants").NB_INST_CONNEXION_ARRAY
const NB_OCTADS_PER_SERIE = require("./constants").NB_OCTADS_PER_GROUP
const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD
const NB_INST_PER_MEM = require("./constants").NB_INST_PER_MEM
const NB_INST_PER_GROUP = require("./constants").NB_INST_PER_GROUP

class Group extends Serie {
  constructor(id, bullGamma) {
    assert(id >= 0, "id should not be negative");
    super(id, bullGamma);
    this.octads = new Array(NB_OCTADS_PER_SERIE)
    for (let i = 0; i < NB_OCTADS_PER_SERIE; ++i) {
      this.octads[i] = new Octad(i + id*NB_OCTADS_PER_SERIE, bullGamma)
    }
    this.lineOffset = NB_INST_CONNEXION_ARRAY + id * NB_INST_PER_GROUP;
    this.maxNbInst = NB_INST_PER_GROUP;
  }

  getInstruction(line) {
    let index = line - this.lineOffset;
    assert(index >= 0 && index < this.maxNbInst, true, "invalid instruction index");
    let q = Math.floor(index / NB_INST_PER_MEM);
    let r = index % NB_INST_PER_MEM;

    // blank line every 3 instructions
    if (r === NB_INST_PER_MEM - 1) {
      return new NOP(this.bullGamma);
    }

    let mem = this.octads[Math.floor(q / NB_MEMORIES_PER_OCTAD)].getMemory(q % NB_MEMORIES_PER_OCTAD)
    let TO = mem.blocks[4 * r + 3];
    let AD = mem.blocks[4 * r + 2];
    let OD = mem.blocks[4 * r + 1];
    let OF = mem.blocks[4 * r + 0];

    // try to compute an instruction, else return nop as an instruction
    // that does not have implementation
    try {
      return this.bullGamma.parser.parseInstruction(TO, AD, OD, OF);
    } catch (error) {
      return new NOP(this.bullGamma);
    }
  }

  getInstructions() {
    let list = []
    for (let i=0; i<this.maxNbInst; i++) {
      list.push(this.getInstruction(i + this.lineOffset));
    }
    return list;
  }
}

module.exports.Group = Group;
