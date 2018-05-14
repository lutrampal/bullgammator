BullGamma = require("../../machine/bullGamma").BullGamma;
MagneticDrum = require("../../machine/magneticDrum").MagneticDrum;
DrumTrackGroup = require("../../machine/drumTrackGroup").DrumTrackGroup;
DrumTrack = require("../../machine/drumTrack").DrumTrack;
DrumBlock = require("../../machine/drumBlock").DrumBlock;
Octad = require("../../machine/octad").Octad;
const NB_BLOCKS_PER_TRACK = require("../../machine/constants").NB_BLOCKS_PER_DRUM_TRACK
assert = require('assert');

describe('DrumTrack', function() {
  describe('#toString()', function () {
    it('should print the DrumTrack properly', function () {
      let bullGamma = new BullGamma();
      console.log(bullGamma.magneticDrum.trackGroups[0].tracks[0].toString());
    });
  });
  describe("#setContent(hexCode)", function () {
    it("should set the DrumTrack's content", function () {
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
      bullGamma.magneticDrum.trackGroups[0].tracks[0].setContent(hexCode.repeat(NB_BLOCKS_PER_TRACK))
      bullGamma.magneticDrum.trackGroups[0].tracks[0].blocks.forEach(function(block) {
				assert.equal(block.toString(), hexCode.toUpperCase(), "returned hex value doesn't match the expected one");
      })
    })
  })
});
