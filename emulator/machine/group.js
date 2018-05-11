assert = require('assert');

Octad = require("./octad").Octad;

const NB_OCTADS_PER_GROUP = require("./constants").NB_OCTADS_PER_GROUP
const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD
const NB_CHRS_PER_WORD = require("./constants").NB_CHRS_PER_WORD
const NB_HEX_VALUES_PER_GROUP = require("./constants").NB_HEX_VALUES_PER_GROUP

class Group {
  constructor(id, bullGamma) {
    assert(id >= 0, "id should not be negative");
    this.id = id
    this.bullGamma = bullGamma
    this.octads = new Array(NB_OCTADS_PER_GROUP)
    for (let i = 0; i < NB_OCTADS_PER_GROUP; ++i) {
      this.octads[i] = new Octad(i + id*NB_OCTADS_PER_GROUP, bullGamma)
    }
  }

  setContent(hexCode) {
    hexCode = hexCode.replace(/--[^\n\r]*(\n\r?|$)/g, ''); // remove comments
    hexCode = hexCode.replace(/[\s\n\r\t]/g, ''); // remove white space and line breaks
    assert(hexCode.length === NB_HEX_VALUES_PER_GROUP, "hexCode should be of length " + NB_HEX_VALUES_PER_GROUP)
    for (let i = 0; i < NB_OCTADS_PER_GROUP; ++i) {
      this.octads[i].setContent(hexCode.substr(i*(NB_MEMORIES_PER_OCTAD*NB_CHRS_PER_WORD),
        (i + 1)*(NB_MEMORIES_PER_OCTAD*NB_CHRS_PER_WORD)))
    }
  }

	/**
	 * Returns the word corresponding to the id
	 * @param id from 0 to 15
	 */
	getWord(id) {
		for (let o = 0; o < NB_OCTADS_PER_GROUP; o++) {
			if (id < (o + 1) * NB_MEMORIES_PER_OCTAD) {
				return this.octads[o].getMemory(id - o * NB_MEMORIES_PER_OCTAD);
			}
		}
	}

  toString() {
    let str = ""
    for (let i = 0; i < NB_OCTADS_PER_GROUP/2; ++i) {
      for (let j = 0; j < NB_MEMORIES_PER_OCTAD; ++j) {
        str += this.octads[i].getMemory(j).toString() + "\t"
          + this.octads[i + NB_OCTADS_PER_GROUP/2].getMemory(j).toString() + "\n"
      }
    }
    return str
  }
}

module.exports.Group = Group;
