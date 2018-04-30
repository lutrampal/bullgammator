const NB_COMMUTED_OCTADS = require("./constants").NB_COMMUTED_OCTADS;
const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD;

class Octad {
  constructor(id, memories) {
    this._id = id;
    this._memories = memories;
  }

  getMemory(idx) {
    return this._memories[idx];
  }
}

module.exports.Octad = Octad;
