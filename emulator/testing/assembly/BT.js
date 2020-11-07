BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
BT= require("../../assembly/BT").BT;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('BT', function() {
  describe('#execute()', function () {
    it('should transfer data from a group to the magnetic drum', function () {
      let bullGamma = new BullGamma();
      let bt = new BT(5, 0xF, 0xE, bullGamma);
      bullGamma.magneticDrum.commutedTrackGroup = bullGamma.magneticDrum.trackGroups[7];
      bullGamma.groups[2].setContent("aaaaaaaaaaaa\n".repeat(16));
      bt.execute();
      assert.equal(
        bullGamma.magneticDrum.trackGroups[7].tracks[15].blocks[7].toString(),
        ("aaaaaaaaaaaa\t".repeat(3) + "aaaaaaaaaaaa\n").repeat(4).toUpperCase()
      );
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new BT(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new BT(1, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
  });
});
