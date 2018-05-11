BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
BT= require("../../assembly/BT").BT;
Memory = require("../../machine/memory").Memory;

describe('BT', function() {
  describe('#execute()', function () {
    it('should transfer data from a group to the magnetic drum', function () {
      let bullGamma = new BullGamma();
      let bt = new BT(5, 0xF, 0xE, bullGamma);
      bullGamma.magneticDrum.commutedTrackGroup = bullGamma.magneticDrum.trackGroups[7]
      bullGamma.groups[2].setContent("aaaaaaaaaaaa\n".repeat(16))
      bt.execute();
      bullGamma.magneticDrum.trackGroups[7].tracks[15].blocks[7].octads.forEach(function (octad) {
        assert.equal(octad.toString(), "aaaaaaaaaaaa\n".repeat(8))
      })
    });
  });
});