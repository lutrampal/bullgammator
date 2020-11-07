BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
VRS = require("../../assembly/VRS").VRS;

describe('VRS', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new VRS(2, 2, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#execute()', function () {
    it('should jump to another series 5', function () {
      let bullGamma = new BullGamma();
      let instr = new VRS(5, 2, 9, bullGamma);
      bullGamma.rnl1 = 193;
      bullGamma.rnl2 = 129;
      instr.execute();
      assert.equal(bullGamma.ns, 3);
      assert.equal(bullGamma.nl, 1);
      assert.equal(bullGamma.rnl1, 193);
      assert.equal(bullGamma.rnl2, 129);
    });
    it('should jump to another series 6', function () {
      let bullGamma = new BullGamma();
      let instr = new VRS(6, 3, 9, bullGamma);
      bullGamma.rnl1 = 193;
      bullGamma.rnl2 = 129;
      instr.execute();
      assert.equal(bullGamma.ns, 2);
      assert.equal(bullGamma.nl, 1);
      assert.equal(bullGamma.rnl1, 193);
      assert.equal(bullGamma.rnl2, 129);
    });
    it('should jump to another series 7', function () {
      let bullGamma = new BullGamma();
      let instr = new VRS(7, 2, 14, bullGamma);
      try {
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "Excution of instruction 17xx not implemented"); // FIXME: implement and test
        return;
      }
      assert(false);
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new VRS(5, 1, 7, bullGamma);
        instr.AD = 3;
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
      let instr = new VRS(5, 1, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new VRS(6, 1, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new VRS(7, 1, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new VRS(5, 1, 7, bullGamma);
        instr.AD = 3;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
