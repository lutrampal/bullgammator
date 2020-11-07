BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
Execution = require("../../control/execution").Execution;

describe('Execution', function() {
  describe('#constructor()', function () {
    it('should fail without bullGamma', function () {
      try {
        let exec = new Execution();
      } catch (e) {
        assert.equal(e.message, "A BullGamma instance must be provided.");
        return;
      }
      assert(false);
    });
  });
  describe('#executeNextInstruction()', function () {
    it('should excute and go to next instruction', function () {
      let bullGamma = new BullGamma()
      let exec = new Execution(bullGamma);
      assert.equal(exec.getCurrentLine(), 0);
      assert.equal(exec.getCurrentSeries(), 3);
      exec.executeNextInstruction();
      assert.equal(exec.getCurrentLine(), 1);
      assert.equal(exec.getCurrentSeries(), 3);
      exec.executeNextInstruction();
      assert.equal(exec.getCurrentLine(), 2);
      assert.equal(exec.getCurrentSeries(), 3);
    });
  });
  describe('#executeUntil()', function () {
    it('should excute until the given line', function () {
      let bullGamma = new BullGamma()
      let exec = new Execution(bullGamma);
      assert.equal(exec.getCurrentLine(), 0);
      assert.equal(exec.getCurrentSeries(), 3);
      exec.executeUntil(12, 3);
      assert.equal(exec.getCurrentLine(), 12);
      assert.equal(exec.getCurrentSeries(), 3);
      exec.executeUntil(43, 3);
      assert.equal(exec.getCurrentLine(), 43);
      assert.equal(exec.getCurrentSeries(), 3);
    });
  });
  describe('#getInstructions()', function () {
    it('should return instructions for series 2', function () {
      let bullGamma = new BullGamma()
      let exec = new Execution(bullGamma);
      let instructions = exec.getInstructions(2);
      assert.equal(instructions[0].getShortType(), "V");
      assert.equal(instructions[3].getShortType(), "V");
      assert.equal(instructions[42].getShortType(), "V");
      assert.equal(instructions[45].getShortType(), "V");
      assert.equal(instructions[63].getShortType(), "V");
      assert.equal(exec.getNumberOfInstructions(2), 64);
      assert.equal(exec.getNumberOfInstructions(2), instructions.length);
    });
  });
  describe('#writeConsoleLine()', function () {
    it('should write a line to the console', function () {
      let bullGamma = new BullGamma()
      let exec = new Execution(bullGamma);
      let test = "This is a test."
      exec.writeConsoleLine(test);
      assert.equal(exec.console.getLines()[0], test);
    });
  });
});
