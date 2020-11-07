BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
EL = require("../../assembly/EL").EL;

describe('EL', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new EL(5, 2, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#execute()', function () {
    it('TODO', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new EL(9, 0, 0, bullGamma);
        instr.execute();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#getDescription()', function () {
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new EL(9, 0, 0, bullGamma);
        instr.OF = 3;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
