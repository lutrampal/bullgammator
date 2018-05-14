BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
GG = require("../../assembly/GG").GG;
Memory = require("../../machine/memory").Memory;

const NB_OCTADS_PER_GROUP = require("../../machine/constants").NB_OCTADS_PER_GROUP
const NB_MEMORIES_PER_OCTAD = require("../../machine/constants").NB_MEMORIES_PER_OCTAD
const NB_TRACKS_PER_TRACK_GROUP = require("../../machine/constants").NB_TRACKS_PER_DRUM_TRACK_GROUP
/*

describe('GG', function() {
  describe('#execute()', function () {
    it('should copy a group to another', function () {
      let bullGamma = new BullGamma();
      let gg = new GG(, bullGamma);
      bullGamma.groups[0].setContent("aaaaaaaaaaaa".repeat(NB_OCTADS_PER_GROUP*NB_MEMORIES_PER_OCTAD))

      gg.execute();
      assert.equal(bullGamma.md, 15);
    });
  });
});*/
