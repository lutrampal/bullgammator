assert = require('assert');

const NB_OCTADS_PER_DRUM_BLOCK = require("./constants").NB_OCTADS_PER_DRUM_BLOCK
const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD
const NB_HEX_VALUES_PER_DRUM_BLOCK = require("./constants").NB_HEX_VALUES_PER_DRUM_BLOCK
const NB_HEX_VALUES_PER_OCTAD = require("./constants").NB_HEX_VALUES_PER_OCTAD

Octad = require("./octad").Octad;
Memory = require("./memory").Memory

class DrumBlock {

  constructor(id, track) {
    this.id = id
    this.track = track
    this.octads = new Array(NB_OCTADS_PER_DRUM_BLOCK)
    for (let i = 0; i < NB_OCTADS_PER_DRUM_BLOCK; ++i) {
      let memories = new Array(8)
      for (let j = 8; j < 16; ++j) {
        memories[j - 8] = new Memory(j, track.trackGroup.drum.bullGamma)
      }
      this.octads[i] = new Octad(i, memories)
    }
  }

  setContent(hexCode) {
    hexCode = hexCode.replace(/[\s\n\r]/g, ''); // remove white space and line breaks
    assert(hexCode.length === NB_HEX_VALUES_PER_DRUM_BLOCK, "hexCode should be of length " + NB_HEX_VALUES_PER_OCTAD)
    for (let i = 0; i < NB_OCTADS_PER_DRUM_BLOCK; ++i) {
      this.octads[i].setContent(hexCode.substr(i*NB_HEX_VALUES_PER_OCTAD, NB_HEX_VALUES_PER_OCTAD))
    }
  }

  toString() {
    let str = ""
    for (let i = 0; i < NB_OCTADS_PER_DRUM_BLOCK/2; ++i) {
      for (let j = 0; j < NB_MEMORIES_PER_OCTAD; ++j) {
        str += this.octads[i].getMemory(j).toString() + "\t"
          + this.octads[i + NB_OCTADS_PER_DRUM_BLOCK/2].getMemory(j).toString() + "\n"
      }
    }
    return str
  }
}

module.exports.DrumBlock = DrumBlock;
