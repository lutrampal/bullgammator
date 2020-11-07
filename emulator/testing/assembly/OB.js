const NB_CHRS_PER_WORD = require("../../machine/constants").NB_CHRS_PER_WORD;
BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
OB = require("../../assembly/OB").OB;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('BO', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new OB(0, 2, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#execute()', function() {
    it('should transfer the value of M1 to MB with a pre-shift if they are not aligned', function() {
      let bullGamma =  new BullGamma();
      let m4 = bullGamma.getMemory(4);
      let m1 = bullGamma.getMemory(1);
      let od = 4, of = 8;
      let ob = new OB(4, od, of, bullGamma);
      let val = 9;
      for (let i = 1; i < 4; ++i) {
        m1.blocks[i] = val;
      }
      bullGamma.md = 1;
      ob.execute();
      for (let i = 0; i < od; ++i) {
        assert.equal(m4.blocks[i], 0, "incorrect shift");
      }
      for (let i = od; i < of - 1; ++i) {
        assert.equal(m4.blocks[i], val, "incorrect transfer");
      }
      for (let i = of - 1; i < NB_CHRS_PER_WORD; ++i) {
        assert.equal(m4.blocks[i], 0, "incorrect shift");
      }
      assert.equal(bullGamma.md, od, "MD was not set to OD");
    });
    it('should transfer MS1 to MB[OF - 1] if M1 is negative', function() {
      let bullGamma =  new BullGamma();
      let m4 = bullGamma.getMemory(4);
      let m1 = bullGamma.getMemory(1);
      let od = 4, of = 9;
      let ob = new OB(4, od, of, bullGamma);
      let val = 9;
      for (let i = 1; i < 4; ++i) {
        m1.blocks[i] = val;
      }
      bullGamma.ms1 = 10;
      bullGamma.md = 1;
      ob.execute();
      assert.equal(m4.blocks[of - 1], 10, "sign was not transferred");
    });
    it('should shift M1 and reset it between OD and OF when AD is 1', function() {
      let bullGamma =  new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let od = 0, of = 4;
      let ob = new OB(1, od, of, bullGamma);
      let val = 9;
      for (let i = 0; i < NB_CHRS_PER_WORD; i+=2) {
        m1.blocks[i] = val;
      }
      bullGamma.md = 3;
      ob.execute();
      for (let i = od; i < of; ++i ) {
        assert.equal(m1.blocks[i], 0, "M1 was not reset between OD and OF");
      }
      for (let i = of; i < NB_CHRS_PER_WORD; ++i) {
        assert.equal(m1.blocks[i], val*(i%2), "M1 was not shifted properly");
      }
    });
    it('should not transfer MS1 if M1[OF - 1] is significant', function() {
      let bullGamma =  new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let od = 0, of = 4;
      let ob = new OB(4, od, of, bullGamma);
      let val = 9;
      for (let i = 0; i < NB_CHRS_PER_WORD; i++) {
        m1.blocks[i] = val;
      }
      bullGamma.ms1 = 10;
      ob.execute();
      assert.equal(bullGamma.getMemory(4).blocks[of - 1], val, "sign was transferred when it shouldn't have been");
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new OB(4, 2, 9, bullGamma);
        instr.AD = 0;
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
      let instr = new OB(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new OB(4, 2, 9, bullGamma);
        instr.AD = 0;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new OB(1, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
  });
});
