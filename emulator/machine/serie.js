assert = require('assert')

const NB_INST_CONNEXION_ARRAY = require("./constants").NB_INST_CONNEXION_ARRAY
const NB_INST_PER_SERIE = require("./constants").NB_INST_PER_SERIE
const NB_INST_PER_MEM = require("./constants").NB_INST_PER_MEM
const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD
NOP = require("../assembly/NOP").NOP

class Serie {
  constructor(id, bullGamma, group) {
    assert(id >= 0, "id should not be negative")
    assert(bullGamma, "bullGamma should neither be null nor undefined")
    this.id = id;
    this.bullGamma = bullGamma;
    if (group !== undefined) {
      this.group = group
    }
    this.lineOffset = NB_INST_CONNEXION_ARRAY + id * NB_INST_PER_SERIE;
    this.nbInst = NB_INST_PER_SERIE;
    this.maxNbInst = NB_INST_PER_SERIE;
  }

  /**
   * Return the instructions list of the series
   */
  getInstruction(line) {
    assert(this.group, "group attribute is undefined")
    let index = line - this.lineOffset;
    assert(index >= 0 && index < this.maxNbInst, true, "invalid instruction index");
    let q = Math.floor(index / NB_INST_PER_MEM);
    let r = index % NB_INST_PER_MEM;

    // blank line every 3 instructions
    if (r === NB_INST_PER_MEM - 1) {
      return new NOP(this.bullGamma);
    }

    let mem = this.group.octads[Math.floor(q / NB_MEMORIES_PER_OCTAD)].getMemory(q % NB_MEMORIES_PER_OCTAD)
    let TO = mem.blocks[4 * r + 3];
    let AD = mem.blocks[4 * r + 2];
    let OD = mem.blocks[4 * r + 1];
    let OF = mem.blocks[4 * r];

    // try to compute an instruction, else return nop as an instruction
    // that does not have implementation
    try {
      return this.bullGamma.parser.parseInstruction(TO, AD, OD, OF);
    } catch (error) {
      return new NOP(this.bullGamma);
    }
  }

  /**
   * Return the instruction at the given line, or null if not found
   * @param line programm line of the desired instruction
   */
  getInstructions() {
    let list = []
    for (let i=0; i<this.maxNbInst; i++) {
      list.push(this.getInstruction(i + this.lineOffset));
    }
    return list;
  }
}

module.exports.Serie = Serie;
