BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
TB= require("../../assembly/TB").TB;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('TB', function() {
  describe('#execute()', function () {
    it('should transfer data from the magnetic drum to a group', function () {
      let bullGamma = new BullGamma();
      let tb = new TB(5, 1, 5, bullGamma);
      bullGamma.magneticDrum.trackGroups[0].tracks[1].blocks[2].setContent("AAAAAAAAAAAA".repeat(16));
      tb.execute();
      bullGamma.groups[2].octads.forEach(function (octad) {
        assert.equal(octad.toString(), "aaaaaaaaaaaa\n".repeat(8).toUpperCase());
      });
    });
    describe('#getDescription()', function () {
      it("should print the instruction's description", function () {
        let bullGamma =  new BullGamma();
        let instr = new TB(4, 5, 7, bullGamma);
        console.debug(instr.getDescription());
      });
    });
  });
});
