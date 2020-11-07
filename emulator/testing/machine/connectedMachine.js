BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
ConnectedMachine = require("../../machine/connectedMachines/connectedMachine").ConnectedMachine;

describe('ConnectedMachine', function() {
  describe('#setBullGamma()', function () {
    it('should set the bullGamma', function () {
      let bullGamma = new BullGamma();
      let machine = new ConnectedMachine();
      assert(!machine.bullGamma);
      machine.setBullGamma(bullGamma);
      assert(machine.bullGamma);
    });
  });
  describe('#on48V()', function () {
    it('should raise not implemented error', function () {
      let machine = new ConnectedMachine();
      try {
        machine.on48V();
      } catch (e) {
        assert.equal(e.message, "You have to implement the method on48V.");
        return;
      }
      assert(false);
    });
  });
  describe('#onStaticExtraction1()', function () {
    it('should raise not implemented error', function () {
      let machine = new ConnectedMachine();
      try {
        machine.onStaticExtraction1(1, 2);
      } catch (e) {
        assert.equal(e.message, "You have to implement the method onStaticExtraction1.");
        return;
      }
      assert(false);
    });
  });
  describe('#onStaticExtraction2()', function () {
    it('should raise not implemented error', function () {
      let machine = new ConnectedMachine();
      try {
        machine.onStaticExtraction2(1, 2);
      } catch (e) {
        assert.equal(e.message, "You have to implement the method onStaticExtraction2.");
        return;
      }
      assert(false);
    });
  });
});
