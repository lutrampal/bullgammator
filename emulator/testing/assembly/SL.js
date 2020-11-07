BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
SL = require("../../assembly/SL").SL;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('SL', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new SL(8, 2, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#execute()', function () {
    it('unconditional jump', function () {
      let bullGamma = new BullGamma();
      let v = new SL(0, 1, 5, bullGamma);
      v.execute();
      assert.equal(bullGamma.nl, 5, 'incorrect CP value');
    });
    it('no jump', function () {
      let bullGamma = new BullGamma();
      let v = new SL(0, 0, 12, bullGamma);
      v.execute();
      assert.equal(bullGamma.nl, 0, 'incorrect CP value');
    });
    it('jump if greater', function () {
      let bullGamma = new BullGamma();
      let v = new SL(1, 14, 8, bullGamma);
      bullGamma.mc.greater = true;
      v.execute();
      assert.equal(bullGamma.nl, 58, 'incorrect CP value');
    });
    it('jump if equal', function () {
      let bullGamma = new BullGamma();
      let v = new SL(2, 4, 4, bullGamma);
      bullGamma.mc.equal = true;
      v.execute();
      assert.equal(bullGamma.nl, 17, 'incorrect CP value');
    });
    it('jump if greater or equal', function () {
      let bullGamma = new BullGamma();
      let v = new SL(3, 1, 4, bullGamma);
      bullGamma.mc.equal = true
      v.execute();
      assert.equal(bullGamma.nl, 5, 'incorrect CP value');
    });
    it('jump if negative', function () {
      let bullGamma = new BullGamma();
      let v = new SL(4, 7, 0, bullGamma);
      bullGamma.ms1 = 10;
      v.execute();
      assert.equal(bullGamma.nl, 28, 'incorrect CP value');
    });
    it('jump if smaller or equal', function () {
      let bullGamma = new BullGamma();
      let v = new SL(1, 15, 1, bullGamma);
      bullGamma.mc.equal = true;
      v.execute();
      assert.equal(bullGamma.nl, 60, 'incorrect CP value');
    });
    it('jump if not equal', function () {
      let bullGamma = new BullGamma();
      let v = new SL(2, 13, 5, bullGamma);
      bullGamma.mc.equal = false;
      v.execute();
      assert.equal(bullGamma.nl, 53, 'incorrect CP value');
    });
    it('jump if smaller', function () {
      let bullGamma = new BullGamma();
      let v = new SL(3, 12, 9, bullGamma);
      bullGamma.mc.greater = false;
      bullGamma.mc.equal = false;
      v.execute();
      assert.equal(bullGamma.nl, 50, 'incorrect CP value');
    });
    it('jump if positive', function () {
      let bullGamma = new BullGamma();
      let v = new SL(4, 11, 13, bullGamma);
      bullGamma.ms1 = 0;
      v.execute();
      assert.equal(bullGamma.nl, 47, 'incorrect CP value');
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new SL(0, 0, 1, bullGamma);
        instr.AD = 7;
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "Jump condition does not exist or is not implemented");
        return;
      }
      assert(false);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new SL(0, 5, 4, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new SL(0, 5, 1, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new SL(4, 5, 8, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new SL(4, 5, 5, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new SL(2, 5, 13, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new SL(2, 0, 0, bullGamma);
        instr.OF = 3;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
