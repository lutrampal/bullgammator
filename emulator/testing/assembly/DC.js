BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
DC = require("../../assembly/DC").DC;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('DC', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let dc = new DC(1, 2, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#execute()', function () {
    it('should divide M2 with MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let m3 = bullGamma.getMemory(3);
      m1.setContent("000000006848");
      m2.setContent("268460000000");
      m3.setContent("000004224000");
      bullGamma.md = 8;
      new DC(3, 3, 7, bullGamma).execute();
      assert.equal(m1.toString(), "000002398000", "wrong result");
      assert.equal(m2.toString(), "000000162127", "wrong result");
    });
    it('when AD = 0, should divide M2 with OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      m1.setContent("000000006848");
      m2.setContent("268460000000");
      new DC(0, 3, 8, bullGamma).execute();
      assert.equal(m2.toString(), "856033557500", "wrong result");
      assert.equal(m1.toString(), "000000000000", "wrong result");
    });
    it('when AD = 0 and OF = 1, should shift left M1 and M2 of MD or OD positions, losing exiting numbers', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      m2.setContent("098765432100");
      bullGamma.md = 10;
      new DC(0, 8, 1, bullGamma).execute();
      assert.equal(m1.toString(), "000987654321", "wrong result");
      assert.equal(m2.toString(), "000000000000", "wrong result");
    });
    it('[Binary mode] should shiftLeft M2 and ooverflow in M1', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY);
      m1.setContent("00000000022F");
      m2.setContent("364B80000000");
      new DC(0, 0, 0x8, bullGamma).execute();
      assert(m1.toString(), "000000000002", "wrong value");
      assert(m2.toString(), "2F364B800000", "wrong value");
    });
    it('[Binary mode] should shiftRight M1-M2', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let m3 = bullGamma.getMemory(3);
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY);
      m1.setContent("00000000022F");
      m2.setContent("364B80000000");
      m3.setContent("000000000008");
      new DC(3, 0, 0, bullGamma).execute();
      assert(m1.toString(), "000000000002", "wrong value");
      assert(m2.toString(), "2F364B800000", "wrong value");
    });
    it('execute should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let dc = new DC(4, 2, 9, bullGamma);
        dc.AD = 2;
        dc.execute();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new DC(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let dc = new DC(4, 2, 9, bullGamma);
        dc.AD = 2;
        dc.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
    it("should print the instruction's description", function () {
      let bullGamma = new BullGamma();
      let instr = new DC(0, 2, 9, bullGamma);
      console.debug(instr.getDescription());
    });
  });
});
