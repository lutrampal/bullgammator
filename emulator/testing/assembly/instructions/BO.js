const NB_BLOCKS_PER_MEMORY = require("../../../machine/memory").NB_BLOCKS_PER_MEMORY;
BullGamma = require("../../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../../machine/memory").MEMORY_MODE;
assert = require('assert');
BO = require("../../../assembly/BO").BO;
Memory = require("../../../machine/memory").Memory;

describe('BO', function() {
  describe('#execute()', function() {
    it('should transfer the value of MB to M1', function() {
      let bullGamma =  new BullGamma();
      let mem4 = bullGamma.getMemory(4);
      let od = 4, of = 8;
      let bo = new BO(4, od, of, bullGamma);
      let val = 4;
      for (i = 0; i < NB_BLOCKS_PER_MEMORY; ++i) {
        mem4.blocks[i] = val;
      }
      bo.execute();
      assert.equal(bullGamma.ms1, 0, "MS1 was not erased");
      assert.equal(bullGamma.md, od, "MD was not set properly");
      for (i = 0; i < od; ++i) {
        assert.equal(bullGamma.getMemory(1).blocks[i], 0, "M1 was not erased");
      }
      for (i = od; i < of; ++i) {
        assert.equal(bullGamma.getMemory(1).blocks[i], val, "M1[" + i + "] was not set properly");
      }
      for (i = of; i < NB_BLOCKS_PER_MEMORY; ++i) {
        assert.equal(bullGamma.getMemory(1).blocks[i], 0, "M1 was not erased");
      }
    });
    it('should not alter MS1 when transferring M1 to M1', function() {
      let bullGamma =  new BullGamma();
      let m1 = bullGamma.getMemory(1);
      bullGamma.ms1 = 10
      let od = 4, of = 8;
      let bo = new BO(1, od, of, bullGamma);
      for (i = 0; i < NB_BLOCKS_PER_MEMORY; ++i) {
        m1.blocks[i] = 4;
      }
      bo.execute();
      assert.equal(bullGamma.ms1, 10, "MS1 was altered");
    });
    it('should transfer OF to M1[OD] when AD is 0', function() {
      let bullGamma =  new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let od = 4, of = 8;
      let bo = new BO(0, od, of, bullGamma);
      bo.execute();
      assert.equal(m1.blocks[od], of, "M1[OD] was not set properly");
    });
    it('[decimal] should transfer the sign of MB to MS1 if it is negative but not copy it to M1', function() {
      let bullGamma =  new BullGamma();
      let mem4 = bullGamma.getMemory(4);
      let od = 4, of = 8;
      let bo = new BO(4, od, of, bullGamma);
      let val = 10;
      for (i = 0; i < NB_BLOCKS_PER_MEMORY; ++i) {
        mem4.blocks[i] = val;
      }
      bo.execute();
      assert.equal(bullGamma.ms1 === 10, true, "MS1 was not set to negative");
      assert.equal(bullGamma.getMemory(1).blocks[of - 1], 0, "MB's sign was transferred to M1");
    });
    it("[decimal] should only transfer ten's complement value if some MB's values are superior to 9", function() {
      let bullGamma =  new BullGamma();
      let mem4 = bullGamma.getMemory(4);
      let od = 4, of = 8;
      let bo = new BO(4, od, of, bullGamma);
      let val = 15;
      for (i = 0; i < NB_BLOCKS_PER_MEMORY; ++i) {
        mem4.blocks[i] = val;
      }
      bo.execute();
      assert.equal(bullGamma.getMemory(1).blocks[of - 1], val - 10, "M1[" + i + "] was not set properly");
    });
    it('[binary] should not interpret 10 as a negative sign', function() {
      let bullGamma =  new BullGamma();
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY);
      let mem4 = bullGamma.getMemory(4);
      let od = 4, of = 8;
      let bo = new BO(4, od, of, bullGamma);
      let val = 10;
      for (i = 0; i < NB_BLOCKS_PER_MEMORY; ++i) {
        mem4.blocks[i] = val;
      }
      bo.execute();
      assert.equal(bullGamma.getMemory(1).blocks[of - 1], 10, "M1[OF - 1] was set to zero as if the value was a " +
        "negative number.");
    });
  });
});
