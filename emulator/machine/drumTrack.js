assert = require('assert');

const NB_BLOCKS_PER_DRUM_TRACK = require("./constants").NB_BLOCKS_PER_DRUM_TRACK;
DrumBlock = require("./drumBlock").DrumBlock;

class DrumTrack {

  constructor(id, trackGroup) {
    this.id = id
    this.trackGroup = trackGroup
    this.blocks = new Array(NB_BLOCKS_PER_DRUM_TRACK)
    for (let i = 0; i < NB_BLOCKS_PER_DRUM_TRACK; ++i) {
      this.blocks[i] = new DrumBlock(i, this)
    }
  }
}

module.exports.DrumTrack = DrumTrack;
