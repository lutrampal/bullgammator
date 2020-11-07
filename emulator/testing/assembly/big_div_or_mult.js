BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
BigDivOrMult = require("../../assembly/big_div_or_mult").BigDivOrMult;

describe('BigDivOrMult', function() {
  describe('#execute()', function () {
    it('should raise not implemented compute', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new BigDivOrMult(2, 5, 2, 9, bullGamma);
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method compute.");
        return;
      }
      assert(false);
    });
    it('should raise not implemented computeValue', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new BigDivOrMult(2, 0, 2, 9, bullGamma);
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method computeValue.");
        return;
      }
      assert(false);
    });
  });
});
