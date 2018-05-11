BullGamma = require("../../machine/bullGamma").BullGamma;
MagneticDrum = require("../../machine/magneticDrum").MagneticDrum;
DrumTrackGroup = require("../../machine/drumTrackGroup").DrumTrackGroup;
DrumTrack = require("../../machine/drumTrack").DrumTrack;
DrumBlock = require("../../machine/drumBlock").DrumBlock;
Octad = require("../../machine/octad").Octad;
assert = require('assert');

describe('DrumBlock', function() {
  describe('#toString()', function () {
    it('should print the DrumBlock properly', function () {
      let bullGamma = new BullGamma();
      console.log(bullGamma.magneticDrum.trackGroups[0].tracks[0].blocks[0].toString())
    });
    describe("#setContent(hexCode)", function () {
      it("should set the DrumBlock's content", function () {
        let bullGamma = new BullGamma()
        let hexCode = "aaaaaaaa0000\t"
          + "bbbbbbbb0000\t"
          + "cccccccc0000\t"
          + "dddddddd0000\n"
          + "eeeeeeee0000\t"
          + "ffffffff0000\t"
          + "111111110000\t"
          + "222222220000\n"
        bullGamma.magneticDrum.trackGroups[0].tracks[0].blocks[0].setContent(hexCode + hexCode)
				assert.equal(bullGamma.magneticDrum.trackGroups[0].tracks[0].blocks[0].toString(),
				hexCode + hexCode, "returned hex value doesn't match the expected one")
      })
    })
  });
});
