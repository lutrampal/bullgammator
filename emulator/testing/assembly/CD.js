BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
CD = require("../../assembly/CD").CD;

describe('CD', function() {
  describe('#execute()', function () {
    it('should set the binary mode', function () {
      let bullGamma = new BullGamma();
      let cd = new CD(0, 0, bullGamma);
      cd.execute();
      assert.equal(bullGamma._memoryMode, MEMORY_MODE.DECIMAL);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new CD(5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
  });
});
