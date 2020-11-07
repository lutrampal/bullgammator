BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
CB = require("../../assembly/CB").CB;

describe('CB', function() {
  describe('#execute()', function () {
    it('should set the binary mode', function () {
      let bullGamma = new BullGamma();
      let cb = new CB(0, 0, bullGamma);
      cb.execute();
      assert.equal(bullGamma._memoryMode, MEMORY_MODE.BINARY);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new CB(5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
  });
});
