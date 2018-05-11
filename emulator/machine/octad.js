const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD;
const NB_GENERAL_MEMORIES = require("./constants").NB_GENERAL_MEMORIES

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
}

module.exports.Octad = Octad;