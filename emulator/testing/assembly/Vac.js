BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
Vac = require("../../assembly/Vac").Vac;

describe('Vac', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new Vac(8, 2, 11, bullGamma);
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
        let instr = new Vac(9, 0, 3, bullGamma);
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
        let instr = new Vac(9, 0, 3, bullGamma);
        instr.OF = 1;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
