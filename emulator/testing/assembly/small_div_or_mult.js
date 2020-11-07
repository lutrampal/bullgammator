BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
SmallDivOrMult = require("../../assembly/small_div_or_mult").SmallDivOrMult;

describe('SmallDivOrMult', function() {
  describe('#execute()', function () {
    it('should raise not implemented compute', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new SmallDivOrMult(2, 5, 2, 9, bullGamma);
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method _compute().");
        return;
      }
      assert(false);
    });
    it('should raise not implemented computeValue', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new SmallDivOrMult(2, 0, 2, 9, bullGamma);
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method _computeValue().");
        return;
      }
      assert(false);
    });
  });
});
