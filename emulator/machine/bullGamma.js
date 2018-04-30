assert = require('assert');

InstructionsParser = require("../assembly/hexParser").InstructionsParser;
Memory = require("./memory").Memory;
GeneralSerie = require("./generalSerie").GeneralSerie;
IOSerie = require("./ioSerie").IOSerie;
Octad = require("./octad").Octad;
CmpMemory = require("./cmpMemory").CmpMemory;

const MEMORY_MODE = require("./constants").MEMORY_MODE;

const NB_MEMORIES_PER_SERIES = require("./constants").NB_MEMORIES_PER_SERIES;
const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD;
const NB_GENERAL_MEMORIES = require("./constants").NB_GENERAL_MEMORIES;
const NB_GENERAL_SERIES = require("./constants").NB_GENERAL_SERIES;
const NB_COMMUTED_OCTADS = require("./constants").NB_COMMUTED_OCTADS;
const NB_OTHER_MEMORIES = require("./constants").NB_OTHER_MEMORIES;

class BullGamma {

  constructor() {
    // Memories
    this._generalMemories = new Array(NB_GENERAL_MEMORIES + NB_OTHER_MEMORIES);
    for (let i = 1; i < NB_GENERAL_MEMORIES + NB_OTHER_MEMORIES; ++i) {
      this._generalMemories[i] = new Memory(i + 1, this);
    }
    // M0 == M1
    this._generalMemories[0] = this._generalMemories[1];

    // Series
    this._generalSeries = new Array(NB_GENERAL_SERIES);
    for (let i = 0; i < NB_GENERAL_SERIES; ++i) {
      this._generalSeries[i] = new GeneralSerie(i, this._generalMemories.slice(
        NB_GENERAL_MEMORIES + i * NB_MEMORIES_PER_SERIES,
        NB_GENERAL_MEMORIES + (i + 1) * NB_MEMORIES_PER_SERIES
      ), this);
    }
    this._ioSerie = new IOSerie(NB_GENERAL_SERIES, this);

    // Octads
    this._commuted_octads = new Array(NB_COMMUTED_OCTADS);
    for (let i = 0; i < NB_COMMUTED_OCTADS; ++i) {
      this._commuted_octads[i] = new Octad(i, this._generalMemories.slice(
        NB_GENERAL_MEMORIES + i * NB_MEMORIES_PER_OCTAD,
        NB_GENERAL_MEMORIES + (i + 1) * NB_MEMORIES_PER_OCTAD
      ));
    }
    this.currentOctad = 0;

    // Other
    this._memoryMode = MEMORY_MODE.DECIMAL;
    this.ms1 = 0;
    this.md = 0;
    this.mc = new CmpMemory();
    this.cp = 0
    this.parser = new InstructionsParser(this);
  }

  /**
   * Given an ID, return the corresponding serie
   * @param id the serie to return, should be between 0 and 2 included
   */
  getSerie(id) {
    assert.equal(id >= 0, true, "series id should be positive");
    assert.equal(id < NB_GENERAL_SERIES + 1, true, "series id should be inferior to " + NB_GENERAL_SERIES + 1);
    if (id < NB_GENERAL_SERIES) {
      return this._generalSeries[id];
    }
    return this._ioSerie;
  }

  /**
   * Given an ID, return the corresponding octad
   * @param id the octad to return, should be between 0 and 7 included
   */
  getOctad(id) {
    assert.equal(id >= 0, true, "octad id should be positive");
    assert.equal(id < NB_COMMUTED_OCTADS, true, "octad id should be inferior to " + NB_COMMUTED_OCTADS);
    return this._commuted_octads[id];
  }

  /**
   * @param id the memory to be returned, if superior to 7, then the memory is selected from the octad
   * @param octad if given, the memory will be selected from this octad, else from the current octad
   * @returns {*} the memory with the desired id
   */
  getMemory(id, octad) {
    assert.equal(id >= 0, true, "memory id should not be negative");
    assert.equal(id < NB_GENERAL_MEMORIES + NB_MEMORIES_PER_OCTAD, true, "memory id should be inferior to " + NB_GENERAL_MEMORIES + NB_MEMORIES_PER_OCTAD);
    octad = octad || this.currentOctad;
    assert.equal(octad >= 0, true, "octad id should not be negative");
    assert.equal(octad < NB_COMMUTED_OCTADS, true, "octad id should be inferior to " + NB_COMMUTED_OCTADS);

    if (id <= NB_GENERAL_MEMORIES) {
      return this._generalMemories[id];
    }
    return this._commuted_octads[octad].getMemory(id - NB_GENERAL_MEMORIES);
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
