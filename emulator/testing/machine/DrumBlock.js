BullGamma = require("../../machine/bullGamma").BullGamma;
MagneticDrum = require("../../machine/magneticDrum/magneticDrum").MagneticDrum;
DrumTrackGroup = require("../../machine/magneticDrum/drumTrackGroup").DrumTrackGroup;
DrumTrack = require("../../machine/magneticDrum/drumTrack").DrumTrack;
DrumBlock = require("../../machine/magneticDrum/drumBlock").DrumBlock;
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
				hexCode.repeat(2).toUpperCase(), "returned hex value doesn't match the expected one")
      })
    })
  });
});
