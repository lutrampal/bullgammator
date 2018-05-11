BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
DC = require("../../assembly/DC").DC;
Memory = require("../../machine/memory").Memory;

describe('DC', function() {
  describe('#execute()', function () {
    it('should divide M2 with MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let m3 = bullGamma.getMemory(3);
      m1.blocks[3] = 6
      m1.blocks[2] = 8
      m1.blocks[1] = 4
      m1.blocks[0] = 8

      m2.blocks[11] = 2
      m2.blocks[10] = 6
      m2.blocks[9] = 8
      m2.blocks[8] = 4
      m2.blocks[7] = 6

      m3.blocks[6] = 4
      m3.blocks[5] = 2
      m3.blocks[4] = 2
      m3.blocks[3] = 4

      bullGamma.md = 8
      new DC(3, 3, 7, bullGamma).execute();
      assert(m2.getDecimalValue(0, 12), 162127, "wrong result");
      assert(m1.getDecimalValue(0, 12), 23980000000, "wrong result");
    });
    it('when AD = 0, should divide M2 with OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      m1.blocks[3] = 6
      m1.blocks[2] = 8
      m1.blocks[1] = 4
      m1.blocks[0] = 8

      m2.blocks[11] = 2
      m2.blocks[10] = 6
      m2.blocks[9] = 8
      m2.blocks[8] = 4
      m2.blocks[7] = 6

      bullGamma.md = 7
      new DC(0, 3, 4, bullGamma).execute();
      assert(m2.getDecimalValue(0, 12), 17120671, "wrong result");
      assert(m1.getDecimalValue(0, 12), 800, "wrong result");
    });
    it('when AD = 0 and OF = 1, should shift left M1 and M2 of MD or OD positions, losing exiting numbers', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      m2.blocks[10] = 9
      m2.blocks[9] = 8
      m2.blocks[8] = 7
      m2.blocks[7] = 6
      m2.blocks[6] = 5
      m2.blocks[5] = 4
      m2.blocks[4] = 3
      m2.blocks[3] = 2
      m2.blocks[2] = 1
      bullGamma.md = 10
      new DC(0, 10, 1, bullGamma).execute();
      assert(m1.getDecimalValue(0, 12), 12345678900, "wrong result");
    });
  });
});