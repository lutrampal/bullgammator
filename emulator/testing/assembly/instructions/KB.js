const NB_BLOCKS_PER_MEMORY = require("../../../machine/memory").NB_BLOCKS_PER_MEMORY;
BullGamma = require("../../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../../machine/bullGamma").MEMORY_MODE;
assert = require('assert');
KB = require("../../../assembly/KB").KB;
Memory = require("../../../machine/memory").Memory;

describe('KB', function() {
  describe('#execute()', function() {
    it('[binary] should set blocks to the correct value', function() {
      let bullGamma =  new BullGamma();
      let mem4 = bullGamma.getMemory(4);
      let kb = new KB(4, 4, 4, bullGamma);
      kb.execute();
      assert.equal(mem4.blocks[4] === 4, true, "expected block value was 4, got " + mem4.blocks[4]);
    });
    it('[decimal] should set blocks to the correct value', function() {
      let bullGamma =  new BullGamma();
      bullGamma.setMemoryMode(MEMORY_MODE.DECIMAL);
      let mem4 = bullGamma.getMemory(4);
      let kb = new KB(4, 4, 4, bullGamma);
      kb.execute();
      assert.equal(mem4.blocks[4] === 4, true, "expected block value was 4, got " + mem4.blocks[4]);
    });
    it('[decimal] should set the next block to the correct value when constant is superior to 9', function() {
      let bullGamma =  new BullGamma();
      bullGamma.setMemoryMode(MEMORY_MODE.DECIMAL);
      let mem4 = bullGamma.getMemory(4);
      let kb = new KB(4, 4, 10, bullGamma);
      kb.execute();
      assert.equal(mem4.blocks[4] === 0, true, "expected block value was 0, got " + mem4.blocks[4]);
      assert.equal(mem4.blocks[5] === 1, true, "expected block value was 1, got " + mem4.blocks[5]);
    });
    it('[decimal] should set block 0 to the correct value when constant is superior to 9 and block index is 11',
      function() {
        let bullGamma =  new BullGamma();
        bullGamma.setMemoryMode(MEMORY_MODE.DECIMAL);
        let mem4 = bullGamma.getMemory(4);
        let kb = new KB(4, 11, 10, bullGamma);
        kb.execute();
        assert.equal(mem4.blocks[11] === 0, true, "expected block value was 0, got " + mem4.blocks[11]);
        assert.equal(mem4.blocks[0] === 1, true, "expected block value was 1, got " + mem4.blocks[0]);
    });
  });
});