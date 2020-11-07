BullGamma = require("../../machine/bullGamma").BullGamma;
const NB_CHRS_PER_WORD = require("../../machine/constants").NB_CHRS_PER_WORD;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
BD = require("../../assembly/BD").BD;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('BD', function() {
  describe('#execute()', function () {
    it('should transfer any M2 block to MD', function () {
      let bullGamma = new BullGamma();
      let m2 = bullGamma.getMemory(2);
      let bd = new BD(2, 0, bullGamma);
      m2.blocks[2] = 15;
      bd.execute();
      assert.equal(bullGamma.md, 15);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new BD(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
  });
});
