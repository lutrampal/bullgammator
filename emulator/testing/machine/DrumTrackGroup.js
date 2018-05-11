BullGamma = require("../../machine/bullGamma").BullGamma;
MagneticDrum = require("../../machine/magneticDrum").MagneticDrum;
DrumTrackGroup = require("../../machine/drumTrackGroup").DrumTrackGroup;
DrumTrack = require("../../machine/drumTrack").DrumTrack;
DrumBlock = require("../../machine/drumBlock").DrumBlock;
Octad = require("../../machine/octad").Octad;
const NB_BLOCKS_PER_TRACK = require("../../machine/constants").NB_BLOCKS_PER_DRUM_TRACK
const NB_TRACKS_PER_DRUM_TRACK_GROUP = require("../../machine/constants").NB_TRACKS_PER_DRUM_TRACK_GROUP
assert = require('assert');

describe('DrumTrackGroup', function() {
  describe('#toString()', function () {
    it('should print the DrumTrackGroup properly', function () {
      let bullGamma = new BullGamma();
      console.log(bullGamma.magneticDrum.trackGroups[0].toString())
    })
  })
  describe("#setContent(hexCode)", function () {
    it("should set the DrumTrackGroup's content", function () {
      let bullGamma = new BullGamma()
      let hexCode = "aaaaaaaa0000\t"
        + "bbbbbbbb0000\t"
        + "cccccccc0000\t"
        + "dddddddd0000\n"
        + "eeeeeeee0000\t"
        + "ffffffff0000\t"
        + "111111110000\t"
        + "222222220000\n"
				+ "aaaaaaaa0000\t"
        + "bbbbbbbb0000\t"
        + "cccccccc0000\t"
        + "dddddddd0000\n"
        + "eeeeeeee0000\t"
        + "ffffffff0000\t"
        + "111111110000\t"
        + "222222220000\n"
      bullGamma.magneticDrum.trackGroups[0].setContent(
        hexCode.repeat(NB_TRACKS_PER_DRUM_TRACK_GROUP * NB_BLOCKS_PER_TRACK))
      bullGamma.magneticDrum.trackGroups[0].tracks.forEach(function (track) {
        track.blocks.forEach(function (block) {
					assert.equal(block.toString(), hexCode, "returned hex value doesn't match the expected one")
        })
      })
    })
  })
})
