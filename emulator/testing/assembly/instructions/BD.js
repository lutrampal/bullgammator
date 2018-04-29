BullGamma = require("../../../machine/bullGamma").BullGamma;
const NB_BLOCKS_PER_MEMORY = require("../../../machine/constants").NB_BLOCKS_PER_MEMORY;
MEMORY_MODE = require("../../../machine/constants").MEMORY_MODE;
assert = require('assert');
BD = require("../../../assembly/BD").BD;
Memory = require("../../../machine/memory").Memory;

describe('BD', function() {
  describe('#execute()', function () {
    it('should transfer any M2 block to MD', function () {
      let bullGamma = new BullGamma();
      let m2 = bullGamma.getMemory(2);
      let bd = new BD(2, 0, bullGamma);
      m2.blocks[2] = 15
      bd.execute();
      assert.equal(bullGamma.md, 15);
    });
  });
});
