BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
AMD = require("../../assembly/AMD").AMD;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('AMD', function() {
  describe('#execute()', function () {
    it('should transfer OF to MD', function () {
      let bullGamma = new BullGamma();
      let amd = new AMD(0, 15, bullGamma);
      amd.execute();
      assert.equal(bullGamma.md, 15);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new AMD(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
    });
  });
});
