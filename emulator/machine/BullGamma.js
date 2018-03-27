Memory = require("./Memory").Memory;
Serie = require("./Serie").Serie;

const NB_GENERAL_MEMORIES = 7;
const NB_GENERAL_SERIES = 3;

class BullGamma {

  constructor() {
    this._generalMemories = new Array(NB_GENERAL_MEMORIES);
    for (let i = 0; i < NB_GENERAL_MEMORIES; ++i) {
      this._generalMemories[i] = new Memory(i + 1);
    }
    this._generalSeries = new Array(NB_GENERAL_SERIES);
    for (let i = 0; i < NB_GENERAL_SERIES; ++i) {
      this._generalSeries[i] = new Serie(i);
    }
  }

  getMemory(id) {
    if (id <= 0 || id > NB_GENERAL_MEMORIES + 8) {
      console.error("The requested memory (M" + id + ") doesn't exist.");
      return null;
    }
    if (id <= NB_GENERAL_MEMORIES) {
      return this._generalMemories[id - 1];
    }
    this._generalSeries[0].getOctad(0).get(id - NB_GENERAL_MEMORIES - 1);
  }

}

module.exports.BullGamma = BullGamma;
module.exports.NB_GENERAL_MEMORIES = NB_GENERAL_MEMORIES;
module.exports.NB_GENERAL_SERIES = NB_GENERAL_SERIES;