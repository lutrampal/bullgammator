BullGamma = require("../../machine/bullGamma").BullGamma;
NB_CHRS_PER_WORD = require("../../machine/constants").NB_CHRS_PER_WORD;
assert = require('assert');
IL = require("../../assembly/IL").IL;

describe('IL M2', function() {
  describe('#execute()', function () {
    it('should not affect M1', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
      for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
        m1.blocks[i] = i + 2;
        m2.blocks[i] = i + 2;
      }
      let il = new IL(12, 0, 0, bullGamma);
      il.execute();

      for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
        assert(m1.blocks[i] == i + 2, "block " + i + " has changed");
      }
    });
    it('should M1 & M2', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      let m2 = bullGamma.getMemory(2);
			m1vals  = "123456789ABC".split("").map(v => parseInt(v, 16));
			m2vals  = "987654322222".split("").map(v => parseInt(v, 16));
			resvals = "103454300220".split("").map(v => parseInt(v, 16));
      for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
        m1.blocks[i] = m1vals[i];
        m2.blocks[i] = m2vals[i];
      }
      let il = new IL(12, 0, 0, bullGamma);
      il.execute();

      for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
        assert(m1.blocks[i] == resvals[i], "block " + i + " is incorrect");
      }
    });
  });
});
describe('IL OF', function() {
  describe('#execute()', function () {
    it('should not affect M1', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
      for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
        m1.blocks[i] = i + 2;
      }
      let il = new IL(10, 0, 15, bullGamma);
      il.execute();

      for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
        assert(m1.blocks[i] == i + 2, "block " + i + " has changed");
      }
    });
    it('should M1 & M2', function () {
      let bullGamma = new BullGamma();
      let m1 = bullGamma.getMemory(1);
			m1vals  = "123456789ABC".split("").map(v => parseInt(v, 16));
			resvals = "101454501014".split("").map(v => parseInt(v, 16));
      for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
        m1.blocks[i] = m1vals[i];
      }
      let il = new IL(10, 0, 5, bullGamma);
      il.execute();

      for (let i = 0; i < NB_CHRS_PER_WORD; ++i) {
        assert(m1.blocks[i] == resvals[i], "block " + i + " is incorrect");
      }
    });
  });
});
