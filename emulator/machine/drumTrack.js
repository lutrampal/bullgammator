assert = require('assert');

const NB_BLOCKS_PER_DRUM_TRACK = require("./constants").NB_BLOCKS_PER_DRUM_TRACK;
const NB_OCTADS_PER_DRUM_BLOCK = require("./constants").NB_OCTADS_PER_DRUM_BLOCK
const NB_MEMORIES_PER_OCTAD = require("./constants").NB_MEMORIES_PER_OCTAD
const NB_HEX_VALUES_PER_DRUM_BLOCK = require("./constants").NB_HEX_VALUES_PER_DRUM_BLOCK
const NB_HEX_VALUES_PER_DRUM_TRACK = require("./constants").NB_HEX_VALUES_PER_DRUM_TRACK

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

  setContent(hexCode) {
    hexCode = hexCode.replace(/[\s\n\r\t]/g, ''); // remove white space and line breaks
    assert(hexCode.length === NB_HEX_VALUES_PER_DRUM_TRACK,
      "hexCode should be of length " + NB_HEX_VALUES_PER_DRUM_TRACK)
    for (let i = 0; i < NB_BLOCKS_PER_DRUM_TRACK; ++i) {
      this.blocks[i].setContent(hexCode.substr(i*NB_HEX_VALUES_PER_DRUM_BLOCK, NB_HEX_VALUES_PER_DRUM_BLOCK))
    }
  }

  toString() {
    let str = "";
    for (let t = 0; t < NB_BLOCKS_PER_DRUM_TRACK; ++t) {
			str += this.blocks[t].toString() + "\n";
    }
    return str;
  }
}

module.exports.DrumTrack = DrumTrack;
