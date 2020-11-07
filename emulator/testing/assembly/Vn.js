BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
Vn = require("../../assembly/Vn").Vn;

describe('Vn', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new Vn(8, 2, 11, bullGamma);
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
        let instr = new Vn(5, 0, 3, bullGamma);
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
        let instr = new Vn(5, 0, 3, bullGamma);
        instr.OF = 1;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
