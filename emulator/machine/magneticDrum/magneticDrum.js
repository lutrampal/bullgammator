const assert = require('../../tools/assert');

const NB_TRACK_GROUPS = require("../constants").NB_TRACK_GROUPS;
const NB_HEX_VALUES_PER_MAGNETIC_DRUM = require("../constants").NB_HEX_VALUES_PER_MAGNETIC_DRUM;
const NB_HEX_VALUES_PER_TRACK_GROUP = require("../constants").NB_HEX_VALUES_PER_DRUM_TRACK_GROUP;

DrumTrackGroup = require("./drumTrackGroup").DrumTrackGroup;
InstructionsParser = require("../../assembly/hexParser").InstructionsParser;

/**
 * A magnetic drum is an ancient storage device that was connected to the Bull Gamma
 */
class MagneticDrum {

  /**
   * Constructs a new instance of MagneticDrum
   * @param bullGamma the machine to which this drum is attached
   */
  constructor(bullGamma) {
    assert(bullGamma, "bullGamma must not be null or undefined");
    this.bullGamma = bullGamma;
    this.trackGroups = new Array(NB_TRACK_GROUPS);
    for (let i = 0; i < NB_TRACK_GROUPS; ++i) {
      this.trackGroups[i] = new DrumTrackGroup(i, this);
    }
    this.commutedTrackGroup = this.trackGroups[0];
  }


  /**
   * Set the Word's content with hex values
   * @param hexCode a String that represents the new hex values of this Word
   */
  setContent(hexCode) {
    hexCode = InstructionsParser.parseHex(hexCode);
    assert(
      hexCode.length <= NB_HEX_VALUES_PER_MAGNETIC_DRUM,
      "hexCode should be of length " + NB_HEX_VALUES_PER_MAGNETIC_DRUM
    );
    hexCode = hexCode.padEnd(NB_HEX_VALUES_PER_MAGNETIC_DRUM, "0");
    for (let i = 0; i < NB_TRACK_GROUPS; ++i) {
      this.trackGroups[i].setContent(hexCode.substr(i*NB_HEX_VALUES_PER_TRACK_GROUP, NB_HEX_VALUES_PER_TRACK_GROUP));
    }
  }

  toString() {
    let str = "";
    this.trackGroups.forEach(function(trackGroup) {
      str += trackGroup.toString() + "\n";
    });
    return str;
  }

  setCommutedGroup(id) {
    assert(id >= 0 && id < NB_TRACK_GROUPS, "id should not be negative or superior to " + NB_TRACK_GROUPS);
    this.commutedTrackGroup = this.trackGroups[id];
  }

}

module.exports.MagneticDrum = MagneticDrum;
