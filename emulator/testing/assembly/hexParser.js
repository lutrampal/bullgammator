BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');

const TEST_CODE = "123 4 -- zmitjc\"cckh-n|g\n23aF --dghh\n--dghhd'vt-vrs\n1234\n\n";
const HEX_VALUES = Array.from(Array(16).keys());

describe('InstructionsParser', function() {
  describe('#parseHex()', function () {
    it('should trim unused chars', function () {
      let parser = (new BullGamma()).parser;
      assert.equal(
        InstructionsParser.parseHex(TEST_CODE, 12),
        "123423aF1234"
      );
    });
  });
  describe('#parseInstructions()', function () {
    it('should return 3 instructions from hex code', function () {
      let parser = (new BullGamma()).parser;
      let instructions = parser.parseInstructions(TEST_CODE, 3);
      assert.equal(instructions.length, 3);
    });
    it('should raise error, instruction size', function () {
      let parser = (new BullGamma()).parser;
      let instructions = parser.parseInstructions("123", 1);
      assert.equal(instructions[0].toString(), "1230");
    });
    it('should raise error, instruction content', function () {
      let parser = (new BullGamma()).parser;
      try {
        let instructions = parser.parseInstructions("12RD", 1);
      } catch (e) {
        assert.equal(e.message, "Invalid hex code.");
        return;
      }
      assert(false);
    });
    it('should raise error, instruction does not exist', function () {
      let parser = (new BullGamma()).parser;
      try {
        let instructions = parser.parseInstructions("5555", 1);
      } catch (e) {
        assert.equal(e.message, "Parsing error at instruction #1: Invalid instruction 55xx.");
        return;
      }
      assert(false);
    });
  });
  describe('#parseInstruction() all', function () {
    it('should test all instructions', function () {
      let parser = (new BullGamma()).parser;

      for (let TO of HEX_VALUES) {
        for (let AD of HEX_VALUES) {
          if (TO != 0) {
            try {
              parser.parseInstruction(TO, AD, 0, 0);
            } catch (error) {
              console.log(error.message);
            }
          } else {
            for (let OF of HEX_VALUES) {
              try {
                parser.parseInstruction(TO, AD, 0, OF);
              } catch (error) {
                console.log(error.message);
              }
            }
          }
        }
      }
    });
  });
});
