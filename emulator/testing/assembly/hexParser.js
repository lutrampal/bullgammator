BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');

const TEST_CODE = "123 4 -- zmitjc\"cckh-n|g\n23aF --dghh\n--dghhd'vt-vrs\n1234\n\n";
const HEX_VALUES = Array.from(Array(16).keys());

describe('InstructionsParser', function() {
  describe('#parseHex()', function () {
    it('should trim unused chars', function () {
      let parser = (new BullGamma()).parser;
      assert.equal(
        InstructionsParser.parseHex(TEST_CODE),
        "123423aF1234"
      );
    });
  });
  describe('#parseInstructions()', function () {
    it('should return 3 instructions from hex code', function () {
      let parser = (new BullGamma()).parser;
      let instructions = parser.parseInstructions(TEST_CODE);
      assert.equal(instructions.length, 3);
    });
    it('should raise error, instruction size', function () {
      let parser = (new BullGamma()).parser;
      try {
        let instructions = parser.parseInstructions("123");
      } catch (e) {
        assert.equal(
          e.message,
          "Parsing error at instruction #1: Invalid instruction length: got 3, expected 4."
        );
        return;
      }
      assert(false);
    });
    it('should raise error, instruction content', function () {
      let parser = (new BullGamma()).parser;
      try {
        let instructions = parser.parseInstructions("12RD");
      } catch (e) {
        assert.equal(
          e.message,
          "Invalid hex code"
        );
        return;
      }
      assert(false);
    });
  });
  describe('#parseInstruction() all', function () {
    it('should return 3 instructions from hex code', function () {
      let parser = (new BullGamma()).parser;

      let instructions = []
      for (let TO of HEX_VALUES) {
        instructions.push([]);
        for (let AD of HEX_VALUES) {
          try {
            let inst = parser.parseInstruction(TO, AD, 0, 0);
            instructions[TO].push(inst);
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    });
  });
});
