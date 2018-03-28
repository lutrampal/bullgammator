Memory = require("./memory").Memory;
Serie = require("./serie").Serie;
assert = require('assert');

const NB_GENERAL_MEMORIES = 7;
const NB_GENERAL_SERIES = 3;

MEMORY_MODE = {
  BINARY: {value: 0, name: "binary", code: "b"},
  DECIMAL: {value: 1, name: "decimal", code: "d"}
};

Object.freeze(MEMORY_MODE);

class BullGamma {

  constructor() {
    this._generalMemories = new Array(NB_GENERAL_MEMORIES);
    for (let i = 0; i < NB_GENERAL_MEMORIES; ++i) {
      this._generalMemories[i] = new Memory(i + 1, this);
    }
    this._generalSeries = new Array(NB_GENERAL_SERIES);
    for (let i = 0; i < NB_GENERAL_SERIES; ++i) {
      this._generalSeries[i] = new Serie(i, this);
    }
    this._memoryMode = MEMORY_MODE.BINARY;
  }

  /**
   * @param id the memory to be returned, if superior to 7, then the memory is selected from the current octad
   * @returns {*} the memory with the desired id
   */
  getMemory(id) {
    assert.equal(id >= 0, true, "id should not be negative");
    assert.equal(id < NB_GENERAL_MEMORIES, true, "id should be inferior to " + NB_GENERAL_MEMORIES);

    if (id <= NB_GENERAL_MEMORIES) {
      return this._generalMemories[id - 1];
    }
    return this._generalSeries[0].getOctad(0).get(id - NB_GENERAL_MEMORIES - 1);
  }

  /**
   * @returns {*} the current memory mode for the machine, either MEMORY_MODE.BINARY or MEMORY_MODE.DECIMAL
   */
  getMemoryMode() {
    return this._memoryMode;
  }

  /**
   * set the value for the machine's memory mode
   * @param newMode the new value, either MEMORY_MODE.BINARY or MEMORY_MODE.DECIMAL
   */
  setMemoryMode(newMode) {
    assert.equal(newMode === MEMORY_MODE.BINARY || newMode === MEMORY_MODE.DECIMAL, true, "invalid memory mode");
    this._memoryMode = newMode;
  }

}

module.exports.BullGamma = BullGamma;
module.exports.NB_GENERAL_MEMORIES = NB_GENERAL_MEMORIES;
module.exports.NB_GENERAL_SERIES = NB_GENERAL_SERIES;
module.exports.MEMORY_MODE = MEMORY_MODE;