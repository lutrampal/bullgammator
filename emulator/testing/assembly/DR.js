BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
DR = require("../../assembly/DR").DR;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('DR', function() {
  describe('#execute()', function () {
    it('should divide M1 with MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);

      m1.blocks[5] = 9;
      m1.blocks[4] = 3;
      m1.blocks[3] = 4;
      m1.blocks[2] = 6;
      m1.blocks[1] = 5;
      m1.blocks[0] = 4;

      m2.blocks[6] = 2;
      m2.blocks[5] = 3;
      m2.blocks[4] = 2;

      new DR(2, 4, 7, bullGamma).execute();
      assert.equal(bullGamma.getMemory(1).getDecimalValue(0, 4), 4028, "wrong result");
      assert.equal(bullGamma.getMemory(1).getDecimalValue(4, 12), 158, "wrong result");
      assert.equal(bullGamma.md, 0, "MD doesn't equal 0 at the end of the operation");
      assert.equal(bullGamma.ms1, 0, "wrong sign");
    });
    it('when AD = 0, should divide M1 with OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      m1.blocks[0] = 1;
      m1.blocks[1] = 3;
      m1.blocks[2] = 4;
      new DR(0, 3, 4, bullGamma).execute();
      assert.equal(bullGamma.getMemory(1).getDecimalValue(0, 3), 107, "wrong result");
      assert.equal(bullGamma.getMemory(1).getDecimalValue(3, 12), 3, "wrong result");
    });
  });
  describe('#execute()', function() {
    it('should set memory to zero', function() {
      let bullGamma =  new BullGamma();
      let mem4 = bullGamma.getMemory(4);
      for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
        mem4.blocks[i] = 1;
      }
      let zb = new ZB(4, 5, 7, bullGamma);
      zb.execute();
      for (let i = 0; i < 5; ++i) {
        assert.equal(mem4.blocks[i], 1);
      }
      for (let i = 5; i < 7; ++i) {
        assert.equal(mem4.blocks[i], 0);
      }
      for (let i = 7; i < NB_CHRS_PER_WORD; ++i) {
        assert.equal(mem4.blocks[i], 1);
      }
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new DR(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
    });
  });
});
