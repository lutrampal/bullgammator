BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
VCS = require("../../assembly/VCS").VCS;

describe('VCS', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new VCS(5, 2, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#execute()', function () {
    it('should jump to another series 0', function () {
      let bullGamma = new BullGamma();
      let instr = new VCS(0, 2, 9, bullGamma);
      instr.execute();
      assert.equal(bullGamma.ns, 1);
      assert.equal(bullGamma.nl, 10);
      assert.equal(bullGamma.rnl1, 0);
      assert.equal(bullGamma.rnl2, 0);
    });
    it('should jump to another series 1', function () {
      let bullGamma = new BullGamma();
      let instr = new VCS(1, 3, 9, bullGamma);
      instr.execute();
      assert.equal(bullGamma.ns, 1);
      assert.equal(bullGamma.nl, 14);
      assert.equal(bullGamma.rnl1, 193);
      assert.equal(bullGamma.rnl2, 0);
    });
    it('should jump to another series 2', function () {
      let bullGamma = new BullGamma();
      let instr = new VCS(2, 2, 14, bullGamma);
      instr.execute();
      assert.equal(bullGamma.ns, 2);
      assert.equal(bullGamma.nl, 11);
      assert.equal(bullGamma.rnl1, 0);
      assert.equal(bullGamma.rnl2, 193);
    });
    it('should jump to another series 3', function () {
      let bullGamma = new BullGamma();
      let instr = new VCS(3, 2, 9, bullGamma);
      instr.execute();
      assert.equal(bullGamma.ns, 1);
      assert.equal(bullGamma.nl, 10);
      assert.equal(bullGamma.rnl1, 0);
      assert.equal(bullGamma.rnl2, 0);
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new VCS(3, 1, 7, bullGamma);
        instr.AD = 5;
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
      let instr = new VCS(0, 1, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new VCS(1, 1, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new VCS(2, 1, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new VCS(3, 1, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new VCS(3, 1, 7, bullGamma);
        instr.AD = 5;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
