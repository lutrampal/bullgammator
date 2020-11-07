BullGamma = require("../../machine/bullGamma").BullGamma;
ConnectedMachine = require("../../machine/connectedMachines/connectedMachine").ConnectedMachine;
assert = require('assert');
ES = require("../../assembly/ES").ES;

class TestMachine extends ConnectedMachine {
  onStaticExtraction1(OD, OF) {
    throw Error("ES1-" + OD.toString() + "," + OF.toString());
  }

  onStaticExtraction2(OD, OF) {
    throw Error("ES2-" + OD.toString() + "," + OF.toString());
  }
}

describe('ES', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new ES(1, 2, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#execute()', function () {
    it('should call extraction 1', function () {
      let bullGamma =  new BullGamma();
      let machine = new TestMachine();
      bullGamma.connectMachine(machine);
      let instr = new ES(8, 5, 7, bullGamma);
      try {
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "ES1-5,7");
        return;
      }
      assert(false);
    });
    it('should call extraction 2', function () {
      let bullGamma =  new BullGamma();
      let machine = new TestMachine();
      bullGamma.connectMachine(machine);
      let instr = new ES(9, 2, 0xF, bullGamma);
      try {
        instr.execute();
      } catch (e) {
        assert.equal(e.message, "ES2-2,15");
        return;
      }
      assert(false);
    });
    it('should call extraction 1 with no machine', function () {
      let bullGamma =  new BullGamma();
      let instr = new ES(8, 5, 7, bullGamma);
      instr.execute();
    });
    it('should call extraction 2 with no machine', function () {
      let bullGamma =  new BullGamma();
      let instr = new ES(9, 2, 0xF, bullGamma);
      instr.execute();
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new ES(8, 2, 9, bullGamma);
        instr.AD = 1;
        instr.execute();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new ES(8, 5, 7, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new ES(9, 2, 9, bullGamma);
        instr.AD = 1;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
