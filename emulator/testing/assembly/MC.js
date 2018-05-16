BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
MC = require("../../assembly/MC").MC;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('MC', function() {
  describe('#execute()', function () {
    it('should multiply M2 and MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let m3 = bullGamma.getMemory(3);
      for (let i = 0; i < 10; ++i) {
        m2.blocks[i] = 3;
      }
      for (let i = 0; i < 11; ++i) {
        m3.blocks[i] = 5;
      }
      bullGamma.md = 12
      new MC(3, 0, 12, bullGamma).execute();
      assert.equal(m2.getDecimalValue(0, 12), 164814814815, "wrong result");
      assert.equal(m1.getDecimalValue(0, 12), 185185185, "wrong result");
    });
    it('when AD = 0, should multiply M2 with OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      m2.setContent("000099999999")
      new MC(0, 8, 9, bullGamma).execute();
      assert.equal(m1.toString(), "000000089999", "wrong result");
      assert.equal(m2.toString(), "999100000000", "wrong result");
    });
    it('when AD = 0 and OF = 0, should shift right M1 and M2 of MD positions, losing exiting numbers', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      m1.setContent("888888888888")
      m2.setContent("999999999999")
      bullGamma.md = 9
      new MC(0, 5, 0, bullGamma).execute();
      assert.equal(m2.toString(), "888888888999", "wrong result");
      assert.equal(m1.toString(), "000000000888", "wrong result");
    });
    it('when AD = 5 bolliet pdf example', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let m3 = bullGamma.getMemory(3);
      m1.setContent("000000000000")
      m2.setContent("213405246312")
      m3.setContent("032451134621")
      new MC(3, 0, 0, bullGamma).execute();
			assert.equal(m1.toString(), "006925242376", "wrong result in m1");
      assert.equal(m2.toString(), "898375767752", "wrong result in m2");
    });
    it('[Binary mode] should multiply M2 and M1', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let m3 = bullGamma.getMemory(3);
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY)
      bullGamma.ms1 = 10
      bullGamma.md = 8
      m3.setContent("00000000abcd")
      m2.setContent("0000abcdef98")
      new MC(3, 0, 4, bullGamma).execute()
      assert.equal(m1.toString(), "00000000734C", "wrong value")
      assert.equal(m2.toString(), "22F364B80000", "wrong value")
    });
    it('[Binary mode] should multiply M1 and OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY)
      bullGamma.ms1 = 10
      m2.setContent("22F364B80000")
      new MC(0, 4, 0xA, bullGamma).execute()
      assert.equal(m1.toString(), "000000015D81", "wrong value")
      assert.equal(m2.toString(), "EF3000000000", "wrong value")
    });
    it('[Binary mode] should shiftLeft M2 and ooverflow in M1', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY)
      bullGamma.ms1 = 10
      bullGamma.md = 8
      m2.setContent("22F364B80000")
      new MC(0, 0, 0x4, bullGamma).execute()
      assert(m1.toString(), "000000000002", "wrong value")
      assert(m2.toString(), "2F364B800000", "wrong value")
    });
    it('[Binary mode] should shiftLeft M2 and ooverflow in M1', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let m3 = bullGamma.getMemory(3);
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY)
      bullGamma.ms1 = 10
      bullGamma.md = 8
      m2.setContent("22F364B80000")
			m3.setContent("000000000004")
      new MC(3, 0, 0, bullGamma).execute()
      assert(m1.toString(), "000000000002", "wrong value")
      assert(m2.toString(), "2F364B800000", "wrong value")
    });
    describe('#getDescription()', function () {
      it("should print the instruction's description", function () {
        let bullGamma =  new BullGamma();
        let instr = new MC(4, 5, 7, bullGamma);
        console.debug(instr.getDescription());
      })
    })
  });
});
