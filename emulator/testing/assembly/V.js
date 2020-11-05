BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
V = require("../../assembly/V").V;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('V', function() {
  describe('#execute()', function () {
    it('unconditional jump', function () {
      let bullGamma = new BullGamma();
      let v = new V(0, 1, 5, bullGamma);
      v.execute();
      assert.equal(bullGamma.nl, 5, 'incorrect CP value');
    });
    it('no jump', function () {
      let bullGamma = new BullGamma();
      let v = new V(0, 0, 12, bullGamma);
      v.execute();
      assert.equal(bullGamma.nl, 0, 'incorrect CP value');
    });
    it('jump if greater', function () {
      let bullGamma = new BullGamma();
      let v = new V(1, 14, 8, bullGamma);
      bullGamma.mc.greater = true
      v.execute();
      assert.equal(bullGamma.nl, 58, 'incorrect CP value');
    });
    it('jump if equal', function () {
      let bullGamma = new BullGamma();
      let v = new V(2, 4, 4, bullGamma);
      bullGamma.mc.equal = true
      v.execute();
      assert.equal(bullGamma.nl, 17, 'incorrect CP value');
    });
    it('jump if greater or equal', function () {
      let bullGamma = new BullGamma();
      let v = new V(3, 1, 4, bullGamma);
      bullGamma.mc.equal = true
      v.execute();
      assert.equal(bullGamma.nl, 5, 'incorrect CP value');
    });
    it('jump if negative', function () {
      let bullGamma = new BullGamma();
      let v = new V(4, 7, 0, bullGamma);
      bullGamma.ms1 = 10
      v.execute();
      assert.equal(bullGamma.nl, 28, 'incorrect CP value');
    });
    it('jump if smaller or equal', function () {
      let bullGamma = new BullGamma();
      let v = new V(1, 15, 1, bullGamma);
      bullGamma.mc.equal = true
      v.execute();
      assert.equal(bullGamma.nl, 60, 'incorrect CP value');
    });
    it('jump if not equal', function () {
      let bullGamma = new BullGamma();
      let v = new V(2, 13, 5, bullGamma);
      bullGamma.mc.equal = false
      v.execute();
      assert.equal(bullGamma.nl, 53, 'incorrect CP value');
    });
    it('jump if smaller', function () {
      let bullGamma = new BullGamma();
      let v = new V(3, 12, 9, bullGamma);
      bullGamma.mc.greater = false
      bullGamma.mc.equal = false
      v.execute();
      assert.equal(bullGamma.nl, 50, 'incorrect CP value');
    });
    it('jump if positive', function () {
      let bullGamma = new BullGamma();
      let v = new V(4, 11, 13, bullGamma);
      bullGamma.ms1 = 0
      v.execute();
      assert.equal(bullGamma.nl, 47, 'incorrect CP value');
    });
    describe('#getDescription()', function () {
      it("should print the instruction's description", function () {
        let bullGamma =  new BullGamma();
        let instr = new V(4, 5, 4, bullGamma);
        console.debug(instr.getDescription());
      })
    })
  });
});
