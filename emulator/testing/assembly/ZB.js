const NB_CHRS_PER_WORD = require("../../machine/constants").NB_CHRS_PER_WORD;
BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
ZB = require("../../assembly/ZB").ZB;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('ZB', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new ZB(0, 2, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
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
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new ZB(4, 2, 9, bullGamma);
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
      let instr = new ZB(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new ZB(4, 2, 9, bullGamma);
        instr.AD = 0;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
