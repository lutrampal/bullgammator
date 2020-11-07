BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
Serie = require("../../machine/innerComponents/serie").Serie;

describe('Serie', function() {
  describe('#getInstruction()', function () {
    it('should update instructions', function () {
      let bullGamma = new BullGamma();
      let serie = bullGamma.getSerie(2);
      serie.group.setContent("1234".repeat(48));
      assert.equal(serie.getInstruction(0).toString(), "1234");
    });
    it('should replace invalid instruction with NOP', function () {
      let bullGamma = new BullGamma();
      let serie = bullGamma.getSerie(2);
      serie.group.setContent("5555".repeat(48));
      assert.equal(serie.getInstruction(0).toString(), "0000");
    });
  });
});
