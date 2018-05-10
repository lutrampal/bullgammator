assert = require('assert');

const NB_TRACK_GROUPS = require("./constants").NB_TRACK_GROUPS;
DrumTrackGroup = require("./drumTrackGroup").DrumTrackGroup;

class MagneticDrum {

  constructor(bullGamma) {
    assert(bullGamma, "the given BullGamma reference must be valid")
    this.bullGamma = bullGamma
    this.trackGroups = new Array(NB_TRACK_GROUPS)
    for (let i = 0; i < NB_TRACK_GROUPS; ++i) {
      this.trackGroups[i] = new DrumTrackGroup(i, this)
    }
    this.commutedGroup = this.trackGroups[0]
  }

  setContent(hexcode) {
    throw new Error("Not implemented yet")
  }

  setCommutedGroup(id) {
    assert(id >= 0 && id < NB_TRACK_GROUPS, "id should not be negative or superior to " + NB_TRACK_GROUPS)
    this.commutedGroup = this.trackGroups[id]
  }
}

module.exports.MagneticDrum = MagneticDrum;
