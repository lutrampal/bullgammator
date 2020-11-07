BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
Console = require("../../machine/connectedMachines/console").Console;

describe('Console', function() {
  describe('#setBullGamma()', function () {
    it('should set the bullGamma', function () {
      let bullGamma = new BullGamma();
      let machine = new Console();
      assert(!machine.bullGamma);
      machine.setBullGamma(bullGamma);
      assert(machine.bullGamma);
    });
  });
  describe('#on48V()', function () {
    it('should raise not implemented error', function () {
      let bullGamma = new BullGamma();
      let machine = new Console();
      machine.setBullGamma(bullGamma);
      machine.on48V();
      assert.equal(machine.getLines().length, 4);
      assert.equal(machine.getLines()[0], "Sortie 0 : 000000000000");
    });
  });
  describe('#convertToFloat()', function () {
    it('should convert to readable float', function () {
      let machine = new Console();
      assert.equal(machine.convertToFloat("3FC000000000"), 1);
      assert.equal(machine.convertToFloat("BFC000000000"), -1);
      assert.equal(machine.convertToFloat("404000000000"), 2);
      assert.equal(machine.convertToFloat("415000000000"), 10);
    });
  });
  describe('#convertToInt()', function () {
    it('should convert to readable int', function () {
      let machine = new Console();
      assert.equal(machine.convertToInt("000000000001"), 1);
      assert.equal(machine.convertToInt("800000000144"), -324);
      assert.equal(machine.convertToInt("123456789ABC"), 55200370432700);
    });
  });
  describe('#onStaticExtraction1()', function () {
    it('should display raw output', function () {
      let bullGamma = new BullGamma();
      let machine = new Console();
      machine.setBullGamma(bullGamma);
      machine.onStaticExtraction1(0, 2);
      assert.equal(machine.lines[0], "Sortie 2 : 000000000000");
      machine.onStaticExtraction1(0, 9); // does nothing
      assert.equal(machine.lines.length, 1);
    });
    it('should display raw error', function () {
      let bullGamma = new BullGamma();
      let machine = new Console();
      machine.setBullGamma(bullGamma);
      machine.onStaticExtraction1(1, 0);
      assert.equal(machine.lines[0], "Erreur: 000000000000");
      machine.onStaticExtraction1(1, 9); // does nothing
      assert.equal(machine.lines.length, 1);
    });
    it('should display float output', function () {
      let bullGamma = new BullGamma();
      let machine = new Console();
      machine.setBullGamma(bullGamma);
      bullGamma.ioGroup.getWord(15).setContent("BFC000000000");
      machine.onStaticExtraction1(2, 2);
      assert.equal(machine.lines[0], "Sortie 2 : -1");
      machine.onStaticExtraction1(2, 9); // does nothing
      assert.equal(machine.lines.length, 1);
    });
    it('should display int output', function () {
      let bullGamma = new BullGamma();
      let machine = new Console();
      machine.setBullGamma(bullGamma);
      bullGamma.ioGroup.getWord(15).setContent("800000000144");
      machine.onStaticExtraction1(3, 2);
      assert.equal(machine.lines[0], "Sortie 2 : -324");
      machine.onStaticExtraction1(3, 9); // does nothing
      assert.equal(machine.lines.length, 1);
    });
    it('should do nothing', function () {
      let bullGamma = new BullGamma();
      let machine = new Console();
      machine.setBullGamma(bullGamma);
      machine.onStaticExtraction1(5, 2); // does nothing
      assert.equal(machine.lines.length, 0);
    });
  });
  describe('#onStaticExtraction2()', function () {
    it('should raise not implemented error', function () {
      let bullGamma = new BullGamma();
      let machine = new Console();
      machine.setBullGamma(bullGamma);
      machine.onStaticExtraction2(1, 2);
      // nothing happens
    });
  });
});
