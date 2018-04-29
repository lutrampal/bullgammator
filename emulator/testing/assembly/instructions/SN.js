BullGamma = require("../../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../../machine/memory").MEMORY_MODE;
assert = require('assert');
SN = require("../../../assembly/SN").SN;
Memory = require("../../../machine/memory").Memory;

describe('SN', function() {
  describe('#execute()', function () {
    it('should subtract when M1 and MB are positive', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let od = 0, of = 8;
      for (let i = od; i < of; ++i) {
        m1.blocks[i] = 9
        m2.blocks[i] = 9
      }
      new SN(2, 0, 8, bullGamma).execute()
      let total = 0
      for (let i = 0; i < 12; ++i) {
        total += m1.blocks[i]*10**i
      }
      assert.equal(total, 0, "wrong result")
    });
    it('should subtract when M1 and MB are negative', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let od = 0, of = 8;
      for (let i = od; i < of; ++i) {
        m1.blocks[i] = 9
        m2.blocks[i] = 9
      }
      m2.blocks[of - 1] = 10
      bullGamma.ms1 = 10
      new SN(2, 0, 8, bullGamma).execute()
      let total = 0
      for (let i = 0; i < 12; ++i) {
        total += m1.blocks[i]*10**i
      }
      assert.equal(total, 90000000, "wrong result")
      assert.equal(bullGamma.ms1, 10, "wrong sign")
    });
    it('should subtract when M1 is positive and MB is negative', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let od = 0, of = 8;
      for (let i = od; i < of; ++i) {
        m1.blocks[i] = 9
        m2.blocks[i] = 9
      }
      m2.blocks[of - 1] = 10
      new SN(2, 0, 8, bullGamma).execute()
      let total = 0
      for (let i = 0; i < 12; ++i) {
        total += m1.blocks[i]*10**i
      }
      assert.equal(total, 109999998, "wrong result")
    });
    it('should subtract when M1 is negative and MB is positive', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let od = 0, of = 8;
      for (let i = od; i < of; ++i) {
        m1.blocks[i] = 9
        m2.blocks[i] = 9
      }
      bullGamma.ms1 = 10
      new SN(2, 0, 8, bullGamma).execute()
      let total = 0
      for (let i = 0; i < 12; ++i) {
        total += m1.blocks[i]*10**i
      }
      assert.equal(total, 199999998, "wrong result")
      assert.equal(bullGamma.ms1, 10, "wrong sign")
    });
    it('when AD = 1, should reset M1 and invert sign (M1 positive)', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let od = 0, of = 8;
      for (let i = od; i < of; ++i) {
        m1.blocks[i] = 9
      }
      new SN(1, 0, 8, bullGamma).execute()
      let total = 0
      for (let i = 0; i < 12; ++i) {
        total += m1.blocks[i]*10**i
      }
      assert.equal(total, 0, "wrong result")
      assert.equal(bullGamma.ms1, 10, "wrong sign")
    });
    it('when AD = 1, should reset M1 and invert sign (M1 negative)', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let od = 0, of = 8;
      for (let i = od; i < of; ++i) {
        m1.blocks[i] = 9
      }
      bullGamma.ms1 = 10
      new SN(1, 0, 8, bullGamma).execute()
      let total = 0
      for (let i = 0; i < 12; ++i) {
        total += m1.blocks[i]*10**i
      }
      assert.equal(total, 0, "wrong result")
      assert.equal(bullGamma.ms1, 0, "wrong sign")
    });
    it('when AD = 0, should subtract OF to M1[OD]', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      m1.blocks[2] = 8
      new SN(0, 2, 8, bullGamma).execute()
      assert.equal(m1.blocks[2], 0, "wrong result")
    });
    it('when AD = 0, should subtract OF to M1[OD] (overflow test) ', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      m1.blocks[2] = 8
      new SN(0, 2, 9, bullGamma).execute()
      assert.equal(m1.blocks[2], 1, "wrong result")
    });
  });
});