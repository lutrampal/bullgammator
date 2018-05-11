assert = require('assert');

const NB_TRACK_GROUPS = require("./constants").NB_TRACK_GROUPS
const NB_TRACKS_PER_DRUM_TRACK_GROUP = require("./constants").NB_TRACKS_PER_DRUM_TRACK_GROUP
const NB_HEX_VALUES_PER_MAGNETIC_DRUM = require("./constants").NB_HEX_VALUES_PER_MAGNETIC_DRUM
const NB_HEX_VALUES_PER_TRACK_GROUP = require("./constants").NB_HEX_VALUES_PER_DRUM_TRACK_GROUP

DrumTrackGroup = require("./drumTrackGroup").DrumTrackGroup;

class MagneticDrum {

  constructor(bullGamma) {
    assert(bullGamma, "bullGamma must not be null or undefined")
    this.bullGamma = bullGamma
    this.trackGroups = new Array(NB_TRACK_GROUPS)
    for (let i = 0; i < NB_TRACK_GROUPS; ++i) {
      this.trackGroups[i] = new DrumTrackGroup(i, this)
    }
    this.commutedTrackGroup = this.trackGroups[0]
  }

  setContent(hexCode) {
    hexCode = hexCode.replace(/[\s\n\r]/g, ''); // remove white space and line breaks
    assert(hexCode.length === NB_HEX_VALUES_PER_MAGNETIC_DRUM,
      "hexCode should be of length " + NB_HEX_VALUES_PER_MAGNETIC_DRUM)
    for (let i = 0; i < NB_TRACK_GROUPS; ++i) {
      this.trackGroups[i].setContent(hexCode.substr(i*NB_HEX_VALUES_PER_TRACK_GROUP, NB_HEX_VALUES_PER_TRACK_GROUP))
    }
  }

  toString() {
    let str = ""
    this.trackGroups.forEach(function(trackGroup) {
      str += trackGroup.toString() + "\n"
    })
    return str
  }

  setCommutedGroup(id) {
    assert(id >= 0 && id < NB_TRACK_GROUPS, "id should not be negative or superior to " + NB_TRACK_GROUPS)
    this.commutedTrackGroup = this.trackGroups[id]
  }
}

module.exports.MagneticDrum = MagneticDrum;
