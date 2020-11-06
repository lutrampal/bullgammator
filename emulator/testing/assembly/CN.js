BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
CN = require("../../assembly/CN").CN;
Memory = require("../../machine/innerComponents/memory").Memory;

describe('CN', function() {
  describe('#execute()', function () {
    it('should set MC to greater if M1 is greater than MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let od = 0, of = 8;
      bullGamma.md = od;
      for (let i = od; i < of; ++i){
        m1.blocks[i] = 9;
        m2.blocks[i] = 8;
      }
      let cn = new CN(2, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), true);
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true);
      assert.equal(bullGamma.mc.isEqual(), false);
      assert.equal(bullGamma.mc.isLowerOrEqual(), false);
      assert.equal(bullGamma.mc.isLower(), false);
      assert.equal(bullGamma.mc.isNotEqual(), true);
    });
    it('should set MC to lower if M1 is lower than MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let od = 0, of = 8;
      bullGamma.md = od;
      for (let i = od; i < of; ++i){
        m1.blocks[i] = 8;
        m2.blocks[i] = 9;
      }
      let cn = new CN(2, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), false);
      assert.equal(bullGamma.mc.isGreaterOrEqual(), false);
      assert.equal(bullGamma.mc.isEqual(), false);
      assert.equal(bullGamma.mc.isLowerOrEqual(), true);
      assert.equal(bullGamma.mc.isLower(), true);
      assert.equal(bullGamma.mc.isNotEqual(), true);
    });
    it('should set MC to equal if M1 is equal to MB', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      let od = 0, of = 8;
      bullGamma.md = od;
      for (let i = od; i < of; ++i){
        m1.blocks[i] = 9;
        m2.blocks[i] = 9;
      }
      let cn = new CN(2, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), false);
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true);
      assert.equal(bullGamma.mc.isEqual(), true);
      assert.equal(bullGamma.mc.isLowerOrEqual(), true);
      assert.equal(bullGamma.mc.isLower(), false);
      assert.equal(bullGamma.mc.isNotEqual(), false);
    });
    it('when used with AD = 1, should detect remaining numbers in blocks outside of the OD->OF portion', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let od = 2, of = 8;
      bullGamma.md = od;
      m1.blocks[of] = 1;
      let cn = new CN(1, od, of, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), true);
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true);
      assert.equal(bullGamma.mc.isEqual(), false);
      assert.equal(bullGamma.mc.isLowerOrEqual(), false);
      assert.equal(bullGamma.mc.isLower(), false);
      assert.equal(bullGamma.mc.isNotEqual(), true);
    });
    it('when AD = 0, should set MC to greater if M1 is greater than OF^OD', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      m1.blocks[11] = 1;
      let cn = new CN(0, 5, 5, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), true);
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true);
      assert.equal(bullGamma.mc.isEqual(), false);
      assert.equal(bullGamma.mc.isLowerOrEqual(), false);
      assert.equal(bullGamma.mc.isLower(), false);
      assert.equal(bullGamma.mc.isNotEqual(), true);
    });
    it('when AD = 0, should set MC to equal if M1 is equal to OF^OD', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      m1.blocks[5] = 4;
      let cn = new CN(0, 5, 4, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), false);
      assert.equal(bullGamma.mc.isGreaterOrEqual(), true);
      assert.equal(bullGamma.mc.isEqual(), true);
      assert.equal(bullGamma.mc.isLowerOrEqual(), true);
      assert.equal(bullGamma.mc.isLower(), false);
      assert.equal(bullGamma.mc.isNotEqual(), false);
    });
    it('when AD = 0, should set MC to lower if M1 is lower than OF^OD', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      m1.blocks[4] = 6;
      let cn = new CN(0, 5, 3, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.isGreater(), false);
      assert.equal(bullGamma.mc.isGreaterOrEqual(), false);
      assert.equal(bullGamma.mc.isEqual(), false);
      assert.equal(bullGamma.mc.isLowerOrEqual(), true);
      assert.equal(bullGamma.mc.isLower(), true);
      assert.equal(bullGamma.mc.isNotEqual(), true);
    });
    it('should work with le test de José', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m3 = bullGamma.getMemory(3);
      for (let i = 0; i < 6; ++i) {
        m1.blocks[i] = 2;
      }
      for (let i = 0; i < 5; ++i) {
        m3.blocks[i] = 1;
      }
      let cn = new CN(3, 0, 0, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.equal, false);
      assert.equal(bullGamma.mc.greater, true);
    });
    it('should be equal to a constant', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      bullGamma.setMemoryMode(MEMORY_MODE.BINARY);
      m1.setContent("800000000000");
      let cn = new CN(0, 11, 8, bullGamma);
      cn.execute();
      assert.equal(bullGamma.mc.equal, true);
      assert.equal(bullGamma.mc.greater, false);
    });
    describe('#getDescription()', function () {
      it("should print the instruction's description", function () {
        let bullGamma =  new BullGamma();
        let instr = new CN(4, 5, 7, bullGamma);
        console.debug(instr.getDescription());
      })
    })
  });
});
