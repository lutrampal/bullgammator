BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');

describe('BullGamma', function() {
  describe('#getMemory()', function () {
    it('should get from the current octad', function () {
      let bullGamma = new BullGamma();
      bullGamma.getMemory(13, 3).blocks[2] = 12;
      bullGamma.setCommutedOctad(3);
      assert.equal(bullGamma.getMemory(13).blocks[2], 12);
      assert.equal(bullGamma.getMemory(13, null).blocks[2], 12);
    });
  });
  describe('#getExtractors()', function () {
    it('should return extractors values', function () {
      let bullGamma = new BullGamma();
      let extractors = bullGamma.getExtractors();
      assert.equal(extractors.length, 4);
    });
  });
  describe('#getIntroductors()', function () {
    it('should return introductors values', function () {
      let bullGamma = new BullGamma();
      let introductors = bullGamma.getIntroductors();
      assert.equal(introductors.length, 4);
    });
  });
});
