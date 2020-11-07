BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
Instruction = require("../../assembly/instruction").Instruction;

describe('Instruction', function() {
  describe('not implemented functions', function () {
    it('should raise not implemented compute', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new Instruction(2, 5, 2, 9, bullGamma);
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method 'execute'.");
        return;
      }
      assert(false);
    });
    it('should raise not implemented computeValue', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new Instruction(2, 0, 2, 9, bullGamma);
        instr.computeExeTime();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method 'computeExeTime'.");
        return;
      }
      assert(false);
    });
    it('should raise not implemented computeValue', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new Instruction(2, 0, 2, 9, bullGamma);
        instr.getDescription();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method 'getDescription'.");
        return;
      }
      assert(false);
    });
    it('should raise not implemented computeValue', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new Instruction(2, 0, 2, 9, bullGamma);
        instr.getShortType();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method 'getShortType'.");
        return;
      }
      assert(false);
    });
    it('should raise not implemented computeValue', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new Instruction(2, 0, 2, 9, bullGamma);
        instr.getLongType();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method 'getLongType'.");
        return;
      }
      assert(false);
    });
    it('should raise not implemented computeValue', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new Instruction(2, 0, 2, 9, bullGamma);
        instr.toLineString();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method 'getShortType'.");
        return;
      }
      assert(false);
    });
    it('should return the instruction hex code', function () {
      let bullGamma = new BullGamma();
      let instr = new Instruction(2, 0, 12, 9, bullGamma);
      assert.equal(instr.toString(), "20c9");
    });
  });
});
