const assert = require('../tools/assert');

InstructionsParser = require("../assembly/hexParser").InstructionsParser;
Memory = require("./innerComponents/memory").Memory;
Group = require("./innerComponents/group").Group;
Octad = require("./innerComponents/octad").Octad;
CmpMemory = require("./innerComponents/cmpMemory").CmpMemory;
ConnexionArray = require("./innerComponents/connexionArray").ConnexionArray;
Serie = require("./innerComponents/serie").Serie;
MagneticDrum = require("./magneticDrum/magneticDrum").MagneticDrum;

const MEMORY_MODE = require("./constants").MEMORY_MODE;

const NB_BANAL_MEMORIES = require("./constants").NB_BANAL_MEMORIES;
const NB_GROUPS = require("./constants").NB_GROUPS;
const NB_SERIES = require("./constants").NB_SERIES;
const NB_GENERAL_SERIES = require("./constants").NB_GENERAL_SERIES;
const NB_OCTADS_PER_GROUP = require("./constants").NB_OCTADS_PER_GROUP;
const NB_COMMUTED_OCTADS = require("./constants").NB_COMMUTED_OCTADS;
const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD;
NB_MEMORIES_PER_HALF_OCTAD = require('./constants').NB_MEMORIES_PER_HALF_OCTAD;

/**
 * Central class meant to represent the whole machine
 */
class BullGamma {

  /**
   * Constructs a new instance of BullGamma
   */
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
    this.series = new Array(NB_SERIES);
    this.groups = new Array(NB_GROUPS);
    for (let i = 0; i < NB_GENERAL_SERIES; ++i) {
      this.groups[i] = new Group(i, this);
      this.series[i] = new Serie(i, this, this.groups[i]);
    }
    this.series[NB_GENERAL_SERIES] = this.connexionArray;
    this.groups[NB_GENERAL_SERIES] = this.ioGroup;

    this.currentOctad = this.groups[0].octads[0];

    // Other
    this.magneticDrum = new MagneticDrum(this);
    this.connectedMachines = [];
    this._memoryMode = MEMORY_MODE.DECIMAL;
    this.ms1 = 0;
    this.md = 0;
    this.mc = new CmpMemory();
    this.nl = 0; // line number
    this.ns = 3; // series number
    this.rnl1 = 0;
    this.rnl2 = 0;
    this.parser = new InstructionsParser(this);
  }

  /**
   * Given an ID, return the corresponding serie
   * @param id the serie to return, should be between 0 and 3 included
   */
  getSerie(id) {
    assert(id >= 0 && id < NB_SERIES, "id should not be negative or superior to " + NB_SERIES - 1);
    return this.series[id];
  }

  /**
   * Given an ID, return the corresponding group
   * @param id the group to return, should be between 0 and 3 included
   */
  getGroup(id) {
    assert(id >= 0 && id < NB_GROUPS, "id should not be negative or superior to " + NB_GROUPS - 1);
    return this.groups[id];
  }

  /**
   * Given an ID, return the corresponding octad
   * @param id the octad to return, should be between 0 and 7 included
   */
  getOctad(id) {
    assert(id >= 0, "octad id should be positive");
    assert(id < NB_COMMUTED_OCTADS, "octad id should be inferior to " + NB_COMMUTED_OCTADS);
    return this.groups[Math.floor(id/NB_OCTADS_PER_GROUP)].octads[id % NB_OCTADS_PER_GROUP];
  }

  /**
   * Changes the current octad the Bull Gamma is working with
   * @param id id of the desired octad
   */
  setCommutedOctad(id) {
    this.currentOctad = this.getOctad(id);
  }

  /**
   * @param id the memory to be returned, if superior to 7, then the memory is selected from the octad
   * @param octadId if given, the memory will be selected from this octad, else from the current octad
   * @returns {*} the memory with the desired id
   */
  getMemory(id, octadId) {
    assert(id >= 0, "memory id should not be negative");
    assert(
      id < NB_BANAL_MEMORIES + NB_MEMORIES_PER_OCTAD,
      "memory id should be inferior to " + NB_BANAL_MEMORIES + NB_MEMORIES_PER_OCTAD
    );

    if (id < NB_BANAL_MEMORIES) {
      return this._generalMemories[id];
    } else {
      if (octadId !== undefined) {
        return this.getOctad(octadId).getMemory([id - NB_BANAL_MEMORIES]);
      } else {
        return this.currentOctad.getMemory([id - NB_BANAL_MEMORIES]);
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

  /**
   * Compute the next line to be executed if no jump
   * @returns next line
   */
  nextLine() {
    return (this.nl + 1) % (this.getSerie(this.ns).nbInst);
  }

  /**
   * Executes the coming instruction if the current Series
   */
  executeNextInstruction() {
    let old_cp = this.nl;
    this.nl = this.nextLine();

    // execute instruction
    this.getSerie(this.ns).getInstruction(old_cp).execute();
  }

  getExtractors() {
    let extractors = [];
    for (let i=3*NB_MEMORIES_PER_HALF_OCTAD; i<4*NB_MEMORIES_PER_HALF_OCTAD; i++) {
      extractors.push(this.ioGroup.getWord(i));
    }
    return extractors;
  }

  getIntroductors() {
    let introductors = [];
    for (let i=1*NB_MEMORIES_PER_HALF_OCTAD; i<2*NB_MEMORIES_PER_HALF_OCTAD; i++) {
      introductors.push(this.ioGroup.getWord(i));
    }
    return introductors;
  }

  connectMachine(machine) {
    this.connectedMachines.push(machine);
    machine.setBullGamma(this);
  }

}

module.exports.BullGamma = BullGamma;
