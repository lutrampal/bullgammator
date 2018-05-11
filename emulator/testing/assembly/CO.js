BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
CO = require("../../assembly/CO").CO;

describe('CO', function() {
  describe('#execute()', function () {
    it('should transfer OF to currentOctad', function () {
      let bullGamma = new BullGamma();
      let co = new CO(3, bullGamma);
      co.execute();
      assert.equal(bullGamma.currentOctad.id, 3);
    });
  });
});
