BullGamma = require("../../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../../machine/bullGamma").MEMORY_MODE;
assert = require('assert');
CN = require("../../../assembly/CN").CN;
Memory = require("../../../machine/memory").Memory;

describe('CN', function() {
  describe('#execute()', function () {
    it('should set MC to greater if M1 is greater than MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1)
      let m2 = bullGamma.getMemory(2)
      let od = 0, of = 8
      bullGamma.md = od
      for (let i = od; i < of; ++i){
        m1.blocks[i] = 9
        m2.blocks[i] = 8
      }
      let cn = new CN(2, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), true)
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true)
      assert.equal(bullGamma.mc.isEqual(), false)
      assert.equal(bullGamma.mc.isLowerOrEqual(), false)
      assert.equal(bullGamma.mc.isLower(), false)
      assert.equal(bullGamma.mc.isNotEqual(), true)
    });
    it('should set MC to lower if M1 is lower than MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1)
      let m2 = bullGamma.getMemory(2)
      let od = 0, of = 8
      bullGamma.md = od
      for (let i = od; i < of; ++i){
        m1.blocks[i] = 8
        m2.blocks[i] = 9
      }
      let cn = new CN(2, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), false)
      assert.equal(bullGamma.mc.isGreaterOrEqual(), false)
      assert.equal(bullGamma.mc.isEqual(), false)
      assert.equal(bullGamma.mc.isLowerOrEqual(), true)
      assert.equal(bullGamma.mc.isLower(), true)
      assert.equal(bullGamma.mc.isNotEqual(), true)
    });
    it('should set MC to equal if M1 is equal to MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1)
      let m2 = bullGamma.getMemory(2)
      let od = 0, of = 8
      bullGamma.md = od
      for (let i = od; i < of; ++i){
        m1.blocks[i] = 9
        m2.blocks[i] = 9
      }
      let cn = new CN(2, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), false)
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true)
      assert.equal(bullGamma.mc.isEqual(), true)
      assert.equal(bullGamma.mc.isLowerOrEqual(), true)
      assert.equal(bullGamma.mc.isLower(), false)
      assert.equal(bullGamma.mc.isNotEqual(), false)
    });
    it('should use the entirety of M1 to compute comparisons', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1)
      let m2 = bullGamma.getMemory(2)
      let od = 8, of = 12
      bullGamma.md = od
      for (let i = od; i < of; ++i){
        m2.blocks[i] = 9
      }
      let cn = new CN(2, od, of, bullGamma);
      m1.blocks[7] = 1
      cn.execute()
      assert.equal(bullGamma.mc.isGreater(), true)
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true)
      assert.equal(bullGamma.mc.isEqual(), false)
      assert.equal(bullGamma.mc.isLowerOrEqual(), false)
      assert.equal(bullGamma.mc.isLower(), false)
      assert.equal(bullGamma.mc.isNotEqual(), true)
    });
    it('when used with AD = 1, should detect remaining numbers in blocks outside of the OD->OF portion', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1)
      let od = 2, of = 8
      bullGamma.md = od
      m1.blocks[of] = 1
      let cn = new CN(1, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), true)
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true)
      assert.equal(bullGamma.mc.isEqual(), false)
      assert.equal(bullGamma.mc.isLowerOrEqual(), false)
      assert.equal(bullGamma.mc.isLower(), false)
      assert.equal(bullGamma.mc.isNotEqual(), true)
    });
    it('when AD = 0, should set MC to greater if M1[OD] is greater than OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1)
      let od = 2, of = 8
      m1.blocks[od] = 9
      let cn = new CN(0, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), true)
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true)
      assert.equal(bullGamma.mc.isEqual(), false)
      assert.equal(bullGamma.mc.isLowerOrEqual(), false)
      assert.equal(bullGamma.mc.isLower(), false)
      assert.equal(bullGamma.mc.isNotEqual(), true)
    });
    it('when AD = 0, should set MC to equal if M1[OD] is equal to OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1)
      let od = 2, of = 8
      m1.blocks[od] = 8
      let cn = new CN(0, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), false)
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true)
      assert.equal(bullGamma.mc.isEqual(), true)
      assert.equal(bullGamma.mc.isLowerOrEqual(), true)
      assert.equal(bullGamma.mc.isLower(), false)
      assert.equal(bullGamma.mc.isNotEqual(), false)
    });
    it('when AD = 0, should set MC to lower if M1[OD] is lower than OF', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1)
      let od = 2, of = 8
      m1.blocks[od] = 7
      let cn = new CN(0, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), false)
      assert.equal(bullGamma.mc.isGreaterOrEqual(), false)
      assert.equal(bullGamma.mc.isEqual(), false)
      assert.equal(bullGamma.mc.isLowerOrEqual(), true)
      assert.equal(bullGamma.mc.isLower(), true)
      assert.equal(bullGamma.mc.isNotEqual(), true)
    });
    it('should work with le test de José', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1)
      let m3 = bullGamma.getMemory(3)
      for (let i = 0; i < 6; ++i) {
        m1.blocks[i] = 2
      }
      for (let i = 0; i < 5; ++i) {
        m3.blocks[i] = 1
      }
      let cn = new CN(3, 0, 0, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.equal, false)
      assert.equal(bullGamma.mc.greater, true)
    });
  });
});