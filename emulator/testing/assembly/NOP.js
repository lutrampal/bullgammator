BullGamma = require("../../machine/bullGamma").BullGamma;
NOP = require("../../assembly/NOP").NOP;

describe('NOP', function() {
  describe('#execute()', function () {
    it('should set the binary mode', function () {
      let bullGamma = new BullGamma();
      let instr = new NOP(bullGamma);
      instr.execute();
    });
  });
  describe('#getDescription()', function () {
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new NOP(bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
  });
});
