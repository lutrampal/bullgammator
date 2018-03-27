const NB_GENERAL_MEMORIES = require("./BullGamma").NB_GENERAL_MEMORIES;

class Octad {
  constructor(id) {
    this._id = id;
    this._memories = new Array(8);
    for (let i = 0; i < 8; i++) {
      this._memories[i] = new Memory(i + 1 + NB_GENERAL_MEMORIES);
    }
  }

  getMemory(idx) {
    return this._memories[idx];
  }
}

module.exports.Octad = Octad;