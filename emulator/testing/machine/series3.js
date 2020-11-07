BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
Series3 = require("../../machine/innerComponents/series3").Series3;
const NB_INST_SERIES_3 = require("../../machine/constants").NB_INST_SERIES_3;

describe('Series3', function() {
  describe('#setInstructions()', function () {
    it('should set the instructions', function () {
      let bullGamma = new BullGamma();
      let series3 = bullGamma.series3;
      series3.setInstructions("1234");
      assert.equal(series3.getInstruction(0).toString(), "1234");
      let instructions = series3.getInstructions();
      assert.equal(instructions.length, NB_INST_SERIES_3);
      assert.equal(series3.getInstruction(NB_INST_SERIES_3 - 1).toString(), "0000");
    });
    it('should exceed max number of instructions', function () {
      let bullGamma = new BullGamma();
      let series3 = bullGamma.series3;
      try {
        series3.setInstructions("1234".repeat(NB_INST_SERIES_3+1));
      } catch (e) {
        assert.equal(e.message, "Instructions number should not be greater than 64");
        return;
      }
      assert(false);
    });
  });
});
