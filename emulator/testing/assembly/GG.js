BullGamma = require("../../machine/bullGamma").BullGamma;
MEMORY_MODE = require("../../machine/constants").MEMORY_MODE;
assert = require('assert');
GG = require("../../assembly/GG").GG;
Memory = require("../../machine/innerComponents/memory").Memory;

const NB_OCTADS_PER_GROUP = require("../../machine/constants").NB_OCTADS_PER_GROUP
const NB_MEMORIES_PER_OCTAD = require("../../machine/constants").NB_MEMORIES_PER_OCTAD
const NB_TRACKS_PER_TRACK_GROUP = require("../../machine/constants").NB_TRACKS_PER_DRUM_TRACK_GROUP

describe('GG', function() {
  describe('#constructor()', function () {
    it('constructor should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new GG(5, 9, bullGamma);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
  describe('#execute()', function () {
    it('should copy a group to another', function () {
      let bullGamma = new BullGamma();
      let hexCode = "152342277A24DD6CA6266CFD5D62447E6FF".repeat(3);
      bullGamma.getGroup(1).setContent(hexCode);
      assert(
        bullGamma.getGroup(1).toString() !== bullGamma.getGroup(2).toString(),
        "contents should be defferent before transfer"
      );
      let gg = new GG(1, 2, bullGamma);

      gg.execute();
      assert(
        bullGamma.getGroup(1).toString() === bullGamma.getGroup(2).toString(),
        "contents should be equal after transfer"
      );
    });
    it('should set a group to 0', function () {
      let bullGamma = new BullGamma();
      let hexCode = "152342277A24DD6CA6266CFD5D62447E6FF".repeat(3);
      bullGamma.getGroup(1).setContent(hexCode);
      bullGamma.getGroup(2).setContent("");
      let gg = new GG(8, 1, bullGamma);

      gg.execute();
      assert(
        bullGamma.getGroup(1).toString() === bullGamma.getGroup(2).toString(),
        "contents should be equal after transfer"
      );
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new GG(1, 0, bullGamma);
        instr.OD = 5;
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
      let instr = new GG(2, 3, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it("should print the instruction's description", function () {
      let bullGamma =  new BullGamma();
      let instr = new GG(8, 2, bullGamma);
      console.debug(instr.getDescription());
      console.debug(instr.getShortType());
      console.debug(instr.getLongType());
    });
    it('should raise error', function () {
      let bullGamma = new BullGamma();
      try {
        let instr = new GG(1, 0, bullGamma);
        instr.OD = 5;
        instr.getDescription();
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
