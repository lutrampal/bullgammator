assert = require('assert');

Serie = require("./serie").Serie;
const NB_INST_IOSERIES = require("./constants").NB_INST_IOSERIES;

const NB_MEMORIES_PER_SERIES = require("./constants").NB_MEMORIES_PER_SERIES;
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
}

module.exports.GeneralSerie = GeneralSerie;
