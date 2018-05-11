assert = require('assert')

const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD
const NB_GENERAL_MEMORIES = require("./constants").NB_GENERAL_MEMORIES
const NB_HEX_VALUES_PER_OCTAD = require("./constants").NB_HEX_VALUES_PER_OCTAD
const NB_BLOCKS_PER_MEMORY = require("./constants").NB_BLOCKS_PER_MEMORY

Memory = require("./memory").Memory

class Octad {
  constructor(id, bullGamma) {
    this.id = id;
    this._memories = new Array(NB_MEMORIES_PER_OCTAD);
    for (let i = 0; i < NB_MEMORIES_PER_OCTAD; ++i) {
      this._memories[i] = new Memory(NB_GENERAL_MEMORIES + i, bullGamma)
    }
  }

  getMemory(idx) {
    return this._memories[idx];
  }

  setContent(hexCode) {
    hexCode = hexCode.replace(/[\s\n\r]/g, ''); // remove white space and line breaks
    assert(hexCode.length === NB_HEX_VALUES_PER_OCTAD, "hexCode should be of length " + NB_HEX_VALUES_PER_OCTAD)
    for (let i = 0; i < NB_MEMORIES_PER_OCTAD; ++i) {
      this.getMemory(i).setContent(hexCode.substr(i*NB_BLOCKS_PER_MEMORY, NB_BLOCKS_PER_MEMORY))
    }
  }

  toString() {
    let str = ""
    this._memories.forEach(function(memory) {
      str += memory.toString() + "\n"
    })
    return str
  }
}

module.exports.Octad = Octad;