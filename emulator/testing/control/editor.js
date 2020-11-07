BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
Editor = require("../../control/editor").Editor;

const NB_BLOCKS_PER_TRACK = require("../../machine/constants").NB_BLOCKS_PER_DRUM_TRACK
const NB_OCTADS_PER_BLOCK = require("../../machine/constants").NB_OCTADS_PER_DRUM_BLOCK
const NB_TRACK_GROUPS = require("../../machine/constants").NB_TRACK_GROUPS
const NB_TRACKS_PER_DRUM_TRACK_GROUP = require("../../machine/constants").NB_TRACKS_PER_DRUM_TRACK_GROUP

describe('Editor', function() {
  describe('#constructor()', function () {
    it('should fail without bullGamma', function () {
      try {
        let editor = new Editor();
      } catch (e) {
        assert.equal(e.message, "A BullGamma instance must be provided.");
        return;
      }
      assert(false);
    });
  });
  describe('#editSeries3()', function () {
    it('should set an instruction', function () {
      let bullGamma = new BullGamma();
      let editor = new Editor(bullGamma);
      editor.editSeries3("C334 ---67\n3456");
      assert.equal(bullGamma.getSerie(3).getInstruction(0).toString(), "c334");
      assert.equal(bullGamma.getSerie(3).getInstruction(1).toString(), "3456");
    });
  });
  describe('#editDrum()', function () {
    it('should set an instruction', function () {
      let bullGamma = new BullGamma();
      let editor = new Editor(bullGamma);
      let hexCode = "aaaaaaaa0000\t"
        + "bbbbbbbb0000\t"
        + "cccccccc0000\t"
        + "dddddddd0000\n"
        + "eeeeeeee0000\t"
        + "ffffffff0000\t"
        + "111111110000\t"
        + "222222220000\n"
        + "aaaaaaaa0000\t"
        + "bbbbbbbb0000\t"
        + "cccccccc0000\t"
        + "dddddddd0000\n"
        + "eeeeeeee0000\t"
        + "ffffffff0000\t"
        + "111111110000\t"
        + "222222220000\n";
      editor.editDrum(
        hexCode.repeat(NB_TRACK_GROUPS * NB_TRACKS_PER_DRUM_TRACK_GROUP * NB_BLOCKS_PER_TRACK)
      );
      bullGamma.magneticDrum.trackGroups.forEach(function (trackGroup) {
        trackGroup.tracks.forEach(function (track) {
          track.blocks.forEach(function (block) {
            assert.equal(block.toString(), hexCode.toUpperCase(), "returned hex value doesn't match the expected one");
          });
        });
      });
    });
  });
});
