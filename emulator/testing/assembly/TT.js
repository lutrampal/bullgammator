BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
TT = require("../../assembly/TT").TT;

describe('TT', function() {
  describe('#execute()', function () {
    it('should raise not implemented transfer', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new DrumTransfer(1, 4, 2, 9, bullGamma);
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method _transfer()");
        return;
      }
      assert(false);
    });
  });
});
