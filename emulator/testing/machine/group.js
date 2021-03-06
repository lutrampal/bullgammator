BullGamma = require("../../machine/bullGamma").BullGamma
assert = require('assert');

describe('Group', function() {
  describe("#toString()", function () {
    it('should print the Group properly', function () {
      let bullGamma = new BullGamma();
      console.log(bullGamma.groups[0].toString());
    });
  });
  describe("#setContent(hexCode)", function () {
    it("should set the Group's content", function () {
      let bullGamma = new BullGamma();
      let hexCode = "aaaaaaaa0000\n"
        + "bbbbbbbb0000\n"
        + "cccccccc0000\n"
        + "dddddddd0000\n"
        + "eeeeeeee0000\n"
        + "ffffffff0000\n"
        + "111111110000\n"
        + "222222220000\n";
      bullGamma.groups[0].setContent(hexCode + hexCode);
      bullGamma.groups[0].octads.forEach(function(octad) {
        assert.equal(octad.toString(), hexCode.toUpperCase(), "returned hex value doesn't match the expected one");
      });
    });
  });
  describe("#getWord()", function () {
    it("should set the Group's content", function () {
      let bullGamma = new BullGamma();
      assert.equal(bullGamma.groups[0].getWord(0).toString(), "000000000000");
      assert.equal(bullGamma.groups[0].getWord(15).toString(), "000000000000");
    });
    it("should fail", function () {
      let bullGamma = new BullGamma();
      try {
        bullGamma.groups[0].getWord(16).toString();
      } catch (e) {
        assert.equal(e.message, "Not a valid id for word in group: 16");
        return;
      }
      assert(false);
    });
  });
});
