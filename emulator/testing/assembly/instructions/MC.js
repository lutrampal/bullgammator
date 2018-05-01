BullGamma = require("../../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../../machine/memory").MEMORY_MODE;
assert = require('assert');
MC = require("../../../assembly/MC").MC;
Memory = require("../../../machine/memory").Memory;

describe('MC', function() {
  describe('#execute()', function () {
    it('should multiply M2 and MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let m3 = bullGamma.getMemory(3);
      for (let i = 0; i < 10; ++i) {
        m2.blocks[i] = 3;
      }
      for (let i = 0; i < 11; ++i) {
        m3.blocks[i] = 5;
      }
      bullGamma.md = 12
      new MC(3, 0, 12, bullGamma).execute();
      assert(m2.getDecimalValue(0, 12), 164814814815, "wrong result");
      assert(m1.getDecimalValue(0, 12), 185185185, "wrong result");
    });
    it('when AD = 0, should multiply M2 with OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      for (let i = 0; i < 11; ++i) {
        m2.blocks[i] = 9;
      }
      bullGamma.md = 11
      new MC(0, 9, 4, bullGamma).execute();
      assert(m2.getDecimalValue(0, 12), 999999910000, "wrong result");
      assert(m1.getDecimalValue(0, 12), 8999, "wrong result");
    });
    it('when AD = 0 and OF = 0, should shift right M1 and M2 of MD positions, losing exiting numbers', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      for (let i = 0; i < 12; ++i) {
        m2.blocks[i] = 9;
        m1.blocks[i] = 8;
      }
      bullGamma.md = 5
      new MC(0, 9, 0, bullGamma).execute();
      assert(m2.getDecimalValue(0, 12), 88888999999, "wrong result");
      assert(m1.getDecimalValue(0, 12), 888888, "wrong result");
    });
  });
});