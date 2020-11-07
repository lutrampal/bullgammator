BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
OperationWithPreShift = require("../../assembly/operation_with_pre_shift").OperationWithPreShift;

describe('OperationWithPreShift', function() {
  describe('#execute()', function () {
    it('should raise not implemented instruction logic', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new OperationWithPreShift(2, 5, 2, 9, bullGamma);
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method '_exeInstructionLogic'.");
        return;
      }
      assert(false);
    });
  });
});
