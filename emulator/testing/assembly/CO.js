BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
CO = require("../../assembly/CO").CO;

describe('CO', function() {
  describe('#execute()', function () {
    it('should transfer OF to currentOctad', function () {
      let bullGamma = new BullGamma();
      let co = new CO(0, 3, bullGamma);
      co.execute();
      assert.equal(bullGamma.currentOctad.id, 3);
    });
    describe('#getDescription()', function () {
      it("should print the instruction's description", function () {
        let bullGamma =  new BullGamma();
        let instr = new CO(4, 5, 7, bullGamma);
        console.debug(instr.getDescription());
      })
    })
  });
});
