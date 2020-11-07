BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
CO = require("../../assembly/CO").CO;

describe('CO', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let co = new CO(0, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#execute()', function () {
    it('should transfer OF to currentOctad', function () {
      let bullGamma = new BullGamma();
      let co = new CO(0, 3, bullGamma);
      co.execute();
      assert.equal(bullGamma.currentOctad.id, 3);
    });
    it('execute should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let co = new CO(0, 3, bullGamma);
        co.OF = 10;
        co.execute();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new CO(4, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('getDescription should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let co = new CO(0, 3, bullGamma);
        co.OF = 10;
        co.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
