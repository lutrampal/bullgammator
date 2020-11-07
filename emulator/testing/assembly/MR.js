BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
MR = require("../../assembly/MR").MR;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('MR', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new MR(1, 2, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
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
      assert.equal(bullGamma.getMemory(1).getDecimalValue(2, 10), 7010*986, "wrong result");
      assert.equal(bullGamma.md, 0, "MD doesn't equal 0 at the end of the operation");
      assert.equal(bullGamma.ms1, 0, "wrong sign");
    });
    it('negative times positive is negative', function () {
      let bullGamma = new BullGamma();
      bullGamma.ms1 = 10;
      new MR(2, 0, 11, bullGamma).execute();
      assert.equal(bullGamma.ms1, 10, "wrong sign");
    });
    it('negative times negative is positive', function () {
      let bullGamma = new BullGamma();
      bullGamma.ms1 = 10;
      let m2 = bullGamma.getMemory(2);
      m2.blocks[11] = 10;
      new MR(2, 0, 12, bullGamma).execute();
      assert.equal(bullGamma.ms1, 0, "wrong sign");
      assert.equal(m2.blocks[11], 10, "MB's sign was erased");
    });
    it('positive times negative is negative', function () {
      let bullGamma = new BullGamma();
      let m2 = bullGamma.getMemory(2);
      m2.blocks[11] = 10;
      new MR(2, 0, 12, bullGamma).execute();
      assert.equal(m2.blocks[11], 10, "MB's sign was erased");
      assert.equal(bullGamma.ms1, 10, "wrong sign");
    });
    it('when AD = 0, should multiply M1 with OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      m1.blocks[0] = 1;
      m1.blocks[1] = 3;
      m1.blocks[2] = 4;
      new MR(0, 8, 4, bullGamma).execute();
      assert.equal(bullGamma.getMemory(1).getDecimalValue(0, 12), 431*4, "wrong result");
    });
    it('when AD = 0 and OF = 0, should shift right M1 of OD positions, losing exiting numbers', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      for (let i = 0; i < 12; ++i) {
        m1.blocks[i] = 1;
      }
      new MR(0, 8, 0, bullGamma).execute();
      assert.equal(bullGamma.getMemory(1).getDecimalValue(0, 12), 1111, "wrong result");
    });
    it('[Binary mode] should multiply M2 and M1', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY);
      bullGamma.ms1 = 10;
      m1.setContent("00000000FED9");
      m2.setContent("0000A9EE0000");
      new MR(2, 4, 12, bullGamma).execute();
      assert(m1.toString() === "0000A92A2EBE", "wrong value");
    });
    it('[Binary mode] should multiply M1 and OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY);
      bullGamma.ms1 = 10;
      m1.setContent("00000000FED9");
      new MR(0, 4, 0xA, bullGamma).execute();
      assert(m1.toString() === "00000009F47A", "wrong value");
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new MR(4, 2, 9, bullGamma);
        instr.AD = 1;
        instr.execute();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new MR(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new MR(4, 2, 9, bullGamma);
        instr.AD = 1;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
    it("should print the instruction's description", function () {
      let bullGamma = new BullGamma();
      let instr = new MR(0, 2, 9, bullGamma);
      console.debug(instr.getDescription());
    });
  });
});
