BullGamma = require("../../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../../machine/constants").MEMORY_MODE;
assert = require('assert');
MR = require("../../../assembly/MR").MR;
Memory = require("../../../machine/memory").Memory;

describe('MR', function() {
  describe('#execute()', function () {
    it('should multiply M1 and MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      m2.blocks[8] = 1;
      m2.blocks[10] = 7;
      m1.blocks[2] = 6;
      m1.blocks[3] = 8;
      m1.blocks[4] = 9;
      new MR(2, 7, 11, bullGamma).execute();
      assert.equal(bullGamma.getMemory(1).getDecimalValue(2, 10), 7010*986, "wrong result")
      assert.equal(bullGamma.md, 0, "MD doesn't equal 0 at the end of the operation");
      assert.equal(bullGamma.ms1, 0, "wrong sign")
    });
    it('negative times positive is negative', function () {
      let bullGamma = new BullGamma();
      bullGamma.ms1 = 10
      new MR(2, 0, 11, bullGamma).execute();
      assert.equal(bullGamma.ms1, 10, "wrong sign");
    });
    it('negative times negative is positive', function () {
      let bullGamma = new BullGamma();
      bullGamma.ms1 = 10
      let m2 = bullGamma.getMemory(2);
      m2.blocks[11] = 10
      new MR(2, 0, 12, bullGamma).execute();
      assert.equal(bullGamma.ms1, 0, "wrong sign");
      assert.equal(m2.blocks[11], 10, "MB's sign was erased");
    });
    it('positive times negative is negative', function () {
      let bullGamma = new BullGamma();
      let m2 = bullGamma.getMemory(2);
      m2.blocks[11] = 10
      new MR(2, 0, 12, bullGamma).execute();
      assert.equal(m2.blocks[11], 10, "MB's sign was erased");
      assert.equal(bullGamma.ms1, 10, "wrong sign");
    });
    it('when AD = 0, should multiply M1 with OF set in M1[OD]', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      m1.blocks[0] = 1
      m1.blocks[1] = 3
      m1.blocks[2] = 4
      new MR(0, 8, 4, bullGamma).execute();
      assert.equal(bullGamma.getMemory(1).getDecimalValue(0, 12), 431*4, "wrong result")
    });
    it('when AD = 0 and OF = 0, should shift right M1 of OD positions, losing exiting numbers', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      for (let i = 0; i < 12; ++i) {
        m1.blocks[i] = 1
      }
      new MR(0, 8, 0, bullGamma).execute();
      assert.equal(bullGamma.getMemory(1).getDecimalValue(0, 12), 1111, "wrong result")
    });
  });
});