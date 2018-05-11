assert = require('assert');

InstructionsParser = require("../assembly/hexParser").InstructionsParser;
Memory = require("./memory").Memory;
Group = require("./group").Group;
Octad = require("./octad").Octad;
MagneticDrum = require("./magneticDrum").MagneticDrum;
CmpMemory = require("./cmpMemory").CmpMemory;
ConnexionArray = require("./connexionArray").ConnexionArray;
Serie = require("./serie").Serie

const MEMORY_MODE = require("./constants").MEMORY_MODE;

const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD;
const NB_OCTADS_PER_GROUP = require("./constants").NB_OCTADS_PER_GROUP
const NB_BANAL_MEMORIES = require("./constants").NB_BANAL_MEMORIES;
const NB_GENERAL_SERIES = require("./constants").NB_GENERAL_SERIES;
const NB_COMMUTED_OCTADS = require("./constants").NB_COMMUTED_OCTADS;
const NB_INST_CONNEXION_ARRAY = require("./constants").NB_INST_CONNEXION_ARRAY;
const NB_INST_PER_SERIE = require("./constants").NB_INST_PER_SERIE;

class BullGamma {

  constructor() {
    // Memories
    this._generalMemories = new Array(NB_BANAL_MEMORIES);
    for (let i = 1; i < NB_BANAL_MEMORIES; ++i) {
      this._generalMemories[i] = new Memory(i + 1, this);
    }
    // M0 == M1
    this._generalMemories[0] = this._generalMemories[1];

    this.connexionArray = new ConnexionArray(NB_GENERAL_SERIES, this)
    this.ioGroup = new Group(NB_GENERAL_SERIES, this)

    // Series and groups
    this.series = new Array(NB_GENERAL_SERIES + 1);
    this.groups = new Array(NB_GENERAL_SERIES + 1)
    for (let i = 0; i < NB_GENERAL_SERIES; ++i) {
      this.groups[i] = new Group(i, this);
      this.series[i] = new Serie(i, this, this.groups[i])
    }
    this.series[NB_GENERAL_SERIES] = this.connexionArray
    this.groups[NB_GENERAL_SERIES] = this.ioGroup

    this.currentOctad = this.groups[0].octads[0];

    // Other
    this.magneticDrum = new MagneticDrum(this);
    this._memoryMode = MEMORY_MODE.DECIMAL;
    this.ms1 = 0;
    this.md = 0;
    this.mc = new CmpMemory();
    this.cp = 0
    this.rnl1 = 0;
    this.rnl2 = 0;
    this.parser = new InstructionsParser(this);
  }

  /**
   * Given an ID, return the corresponding serie
   * @param id the serie to return, should be between 0 and 2 included
   */
  getSerie(id) {
    assert(id >= 0 && id <= NB_GENERAL_SERIES, "id should not be negative or superior to " + NB_GENERAL_SERIES)
    return this.series[id]
  }

  /**
   * Given an ID, return the corresponding octad
   * @param id the octad to return, should be between 0 and 7 included
   */
  getOctad(id) {
    assert(id >= 0, "octad id should be positive");
    assert(id < NB_COMMUTED_OCTADS, "octad id should be inferior to " + NB_COMMUTED_OCTADS);
    return this.groups[Math.floor(id/NB_OCTADS_PER_GROUP)].octads[id % NB_OCTADS_PER_GROUP]
  }

  /**
   * @param id the memory to be returned, if superior to 7, then the memory is selected from the octad
   * @param octadId if given, the memory will be selected from this octad, else from the current octad
   * @returns {*} the memory with the desired id
   */
  getMemory(id, octadId) {
    assert(id >= 0, "memory id should not be negative");
    assert(id < NB_BANAL_MEMORIES + NB_MEMORIES_PER_OCTAD, "memory id should be inferior to " + NB_BANAL_MEMORIES
      + NB_MEMORIES_PER_OCTAD);

    if (id < NB_BANAL_MEMORIES) {
      return this._generalMemories[id];
    } else {
      if (octadId !== undefined) {
        return this.getOctad(octadId).getMemory([id - NB_BANAL_MEMORIES])
      } else {
        return this.currentOctad.getMemory([id - NB_BANAL_MEMORIES])
      }
    }
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

  execNextInstruction() {
    let old_cp = this.cp;

    // compute series
    let series;
    if (this.cp < NB_INST_CONNEXION_ARRAY) {
      series = this.connexionArray;
    } else {
      let index = 1 + Math.floor((this.cp - NB_INST_CONNEXION_ARRAY) / NB_INST_PER_SERIE);
      series = this.getSerie(index);
    }

    // compute new line
    if (this.cp < NB_INST_CONNEXION_ARRAY) {
      this.cp = (this.cp + 1 - series.lineOffset) % (series.nbInst) + series.lineOffset;
    }

    // execute instruction
    series.getInstruction(old_cp).execute();
  }
}

module.exports.BullGamma = BullGamma;
