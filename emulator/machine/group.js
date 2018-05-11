assert = require('assert');

Octad = require("./octad").Octad;

const NB_OCTADS_PER_SERIE = require("./constants").NB_OCTADS_PER_GROUP
const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD
const NB_BLOCKS_PER_MEMORY = require("./constants").NB_BLOCKS_PER_MEMORY
const NB_HEX_VALUES_PER_GROUP = require("./constants").NB_HEX_VALUES_PER_GROUP

class Group {
  constructor(id, bullGamma) {
    assert(id >= 0, "id should not be negative");
    this.id = id
    this.bullGamma = bullGamma
    this.octads = new Array(NB_OCTADS_PER_SERIE)
    for (let i = 0; i < NB_OCTADS_PER_SERIE; ++i) {
      this.octads[i] = new Octad(i + id*NB_OCTADS_PER_SERIE, bullGamma)
    }
  }


  setContent(hexCode) {
    hexCode = hexCode.replace(/--[^\n\r]*(\n\r?|$)/g, ''); // remove comments
    hexCode = hexCode.replace(/[\s\n\r]/g, ''); // remove white space and line breaks
    assert(hexCode.length === NB_HEX_VALUES_PER_GROUP, "hexCode should be of length " + NB_HEX_VALUES_PER_GROUP)
    for (let i = 0; i < NB_OCTADS_PER_SERIE; ++i) {
      this.octads[i].setContent(hexCode.substr(i*(NB_MEMORIES_PER_OCTAD*NB_BLOCKS_PER_MEMORY),
        (i + 1)*(NB_MEMORIES_PER_OCTAD*NB_BLOCKS_PER_MEMORY)))
    }
  }

  toString() {
    let str = ""
    for (let i = 0; i < NB_OCTADS_PER_SERIE/2; ++i) {
      for (let j = 0; j < NB_MEMORIES_PER_OCTAD; ++j) {
        str += this.octads[i].getMemory(j).toString() + "\t"
          + this.octads[i + NB_OCTADS_PER_SERIE/2].getMemory(j).toString() + "\n"
      }
    }
    return str
  }
}

module.exports.Group = Group;
