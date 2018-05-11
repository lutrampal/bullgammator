BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
DR = require("../../assembly/DR").DR;
Memory = require("../../machine/memory").Memory;

describe('DR', function() {
  describe('#execute()', function () {
    it('should divide M1 with MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);

      m1.blocks[5] = 9
      m1.blocks[4] = 3
      m1.blocks[3] = 4
      m1.blocks[2] = 6
      m1.blocks[1] = 5
      m1.blocks[0] = 4

      m2.blocks[6] = 2
      m2.blocks[5] = 3
      m2.blocks[4] = 2

      new DR(2, 4, 7, bullGamma).execute();
      assert.equal(bullGamma.getMemory(1).getDecimalValue(0, 4), 4028, "wrong result")
      assert.equal(bullGamma.getMemory(1).getDecimalValue(4, 12), 158, "wrong result")
      assert.equal(bullGamma.md, 0, "MD doesn't equal 0 at the end of the operation");
      assert.equal(bullGamma.ms1, 0, "wrong sign")
    });
    it('when AD = 0, should divide M1 with OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      m1.blocks[0] = 1
      m1.blocks[1] = 3
      m1.blocks[2] = 4
      new DR(0, 3, 4, bullGamma).execute();
      assert.equal(bullGamma.getMemory(1).getDecimalValue(0, 3), 107, "wrong result")
      assert.equal(bullGamma.getMemory(1).getDecimalValue(3, 12), 3, "wrong result")
    });
  });
});