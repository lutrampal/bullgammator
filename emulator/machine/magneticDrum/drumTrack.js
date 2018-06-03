assert = require('assert');

const NB_BLOCKS_PER_DRUM_TRACK = require("../constants").NB_BLOCKS_PER_DRUM_TRACK
const NB_HEX_VALUES_PER_DRUM_BLOCK = require("../constants").NB_HEX_VALUES_PER_DRUM_BLOCK
const NB_HEX_VALUES_PER_DRUM_TRACK = require("../constants").NB_HEX_VALUES_PER_DRUM_TRACK

DrumBlock = require("./drumBlock").DrumBlock;
InstructionsParser = require("../../assembly/hexParser").InstructionsParser

/**
 * A DrumTrack is a set of NB_BLOCKS_PER_DRUM_TRACK DrumBlock that is part of a DrumTrackGroup
 */
class DrumTrack {

  /**
   * constructs a new instance of DrumTrack
   * @param id the ID of this Track
   * @param trackGroup the TrackGroup to which this track belongs
   */
  constructor(id, trackGroup) {
    this.id = id
    this.trackGroup = trackGroup
    this.blocks = new Array(NB_BLOCKS_PER_DRUM_TRACK)
    for (let i = 0; i < NB_BLOCKS_PER_DRUM_TRACK; ++i) {
      this.blocks[i] = new DrumBlock(i, this)
    }
  }

  /**
   * Set the Word's content with hex values
   * @param hexCode a String that represents the new hex values of this Word
   */
  setContent(hexCode) {
    hexCode = InstructionsParser.parseHex(hexCode);
    assert(hexCode.length <= NB_HEX_VALUES_PER_DRUM_TRACK,
      "hexCode should be of length " + NB_HEX_VALUES_PER_DRUM_TRACK)
		hexCode = hexCode.padEnd(NB_HEX_VALUES_PER_DRUM_TRACK, "0");
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
