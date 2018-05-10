assert = require('assert');

const NB_OCTADS_PER_DRUM_BLOCK = require("./constants").NB_OCTADS_PER_DRUM_BLOCK;
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
}

module.exports.DrumBlock = DrumBlock;
