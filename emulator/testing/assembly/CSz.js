BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
CSz= require("../../assembly/CSz").CSz;
Memory = require("../../machine/memory").Memory;

describe('CSz', function() {
  describe('#execute()', function () {
    it('should change the commuted track group', function () {
      let bullGamma = new BullGamma();
      let csz = new CSz(0, 6, bullGamma);
      csz.execute();
      assert.equal(bullGamma.magneticDrum.commutedTrackGroup.id, 6, "wrong ID of commuted group");
    });
  });
});