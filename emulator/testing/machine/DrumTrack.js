BullGamma = require("../../machine/bullGamma").BullGamma;
MagneticDrum = require("../../machine/magneticDrum").MagneticDrum;
DrumTrackGroup = require("../../machine/drumTrackGroup").DrumTrackGroup;
DrumTrack = require("../../machine/drumTrack").DrumTrack;
DrumBlock = require("../../machine/drumBlock").DrumBlock;
Octad = require("../../machine/octad").Octad;
const NB_BLOCKS_PER_TRACK = require("../../machine/constants").NB_BLOCKS_PER_DRUM_TRACK
const NB_OCTADS_PER_BLOCK = require("../../machine/constants").NB_OCTADS_PER_DRUM_BLOCK
assert = require('assert');

describe('DrumTrack', function() {
  describe('#toString()', function () {
    it('should print the DrumTrack properly', function () {
      let bullGamma = new BullGamma();
      console.log(bullGamma.magneticDrum.trackGroups[0].tracks[0].toString())
    });
  });
  describe("#setContent(hexCode)", function () {
    it("should set the DrumTrack's content", function () {
      let bullGamma = new BullGamma()
      let hexCode = "aaaaaaaa0000\n"
        + "bbbbbbbb0000\n"
        + "cccccccc0000\n"
        + "dddddddd0000\n"
        + "eeeeeeee0000\n"
        + "ffffffff0000\n"
        + "111111110000\n"
        + "222222220000\n"
      bullGamma.magneticDrum.trackGroups[0].tracks[0].setContent(hexCode.repeat(NB_BLOCKS_PER_TRACK*NB_OCTADS_PER_BLOCK))
      bullGamma.magneticDrum.trackGroups[0].tracks[0].blocks.forEach(function(block) {
        block.octads.forEach(function(octad) {
          assert.equal(octad.toString(), hexCode, "returned hex value doesn't match the expected one")
        })
      })
    })
  })
});