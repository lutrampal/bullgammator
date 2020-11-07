BullGamma = require("../../machine/bullGamma").BullGamma;
const NB_CHRS_PER_WORD = require("../../machine/constants").NB_CHRS_PER_WORD;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
KB = require("../../assembly/KB").KB;
Memory = require("../../machine/innerComponents/memory").Memory;

class TestMachine extends ConnectedMachine {
  on48V() {
    throw Error("48V");
  }
}

describe('KB', function() {
  describe('#execute()', function() {
    it('[binary] should set blocks to the correct value', function() {
      let bullGamma =  new BullGamma();
      let mem4 = bullGamma.getMemory(4);
      let kb = new KB(4, 4, 4, bullGamma);
      kb.execute();
      assert.equal(mem4.blocks[4], 4);
    });
    it('[decimal] should set blocks to the correct value', function() {
      let bullGamma =  new BullGamma();
      bullGamma.setMemoryMode(MEMORY_MODE.DECIMAL);
      let mem4 = bullGamma.getMemory(4);
      let kb = new KB(4, 4, 4, bullGamma);
      kb.execute();
      assert.equal(mem4.blocks[4], 4);
    });
    it('[decimal] should set the next block to the correct value when constant is superior to 9', function() {
      let bullGamma =  new BullGamma();
      bullGamma.setMemoryMode(MEMORY_MODE.DECIMAL);
      let mem4 = bullGamma.getMemory(4);
      let kb = new KB(4, 4, 10, bullGamma);
      kb.execute();
      assert.equal(mem4.blocks[4], 0);
      assert.equal(mem4.blocks[5], 1);
    });
    it('[decimal] should set block 0 to the correct value when constant is superior to 9 and block index is 11',
      function() {
        let bullGamma =  new BullGamma();
        bullGamma.setMemoryMode(MEMORY_MODE.DECIMAL);
        let mem4 = bullGamma.getMemory(4);
        let kb = new KB(4, 11, 10, bullGamma);
        kb.execute();
        assert.equal(mem4.blocks[11], 0);
        assert.equal(mem4.blocks[0], 1);
    });
    it('should call 48V', function () {
      let bullGamma =  new BullGamma();
      let machine = new TestMachine();
      bullGamma.connectMachine(machine);
      let instr = new KB(0, 5, 7, bullGamma);
      try {
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "48V");
        return;
      }
      assert(false);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new KB(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new KB(0, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
      console.debug(instr.toString());
      console.debug(instr.toLineString());
    });
  });
});
