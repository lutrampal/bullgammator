const NB_COMMUTED_OCTADS = 8;
const NB_MEMORIES_PER_OCTAD = 8;

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
module.exports.NB_COMMUTED_OCTADS = NB_COMMUTED_OCTADS;
module.exports.NB_MEMORIES_PER_OCTAD = NB_MEMORIES_PER_OCTAD;
