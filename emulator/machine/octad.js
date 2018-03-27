const NB_GENERAL_MEMORIES = require("./bullGamma").NB_GENERAL_MEMORIES;

class Octad {
  constructor(id, bullGamma) {
    this._id = id;
    this._memories = new Array(8);
    this._bullGamma = bullGamma;
    for (let i = 0; i < 8; i++) {
      this._memories[i] = new Memory(i + 1 + NB_GENERAL_MEMORIES, bullGamma);
    }
  }

  getMemory(idx) {
    return this._memories[idx];
  }
}

module.exports.Octad = Octad;