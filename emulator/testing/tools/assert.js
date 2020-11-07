assert = require('assert');
assertTool = require("../../tools/assert");

describe('assert', function() {
  describe('#assert()', function () {
    it('should succeed', function () {
      assertTool(true);
    });
    it('should fail', function () {
      let message = "Assertion error";
      try {
        assertTool(false, message);
      } catch (e) {
        assert.equal(e.message, message);
        return;
      }
      assert(false);
    });
  });
  describe('#assert.equal()', function () {
    it('should succeed', function () {
      assertTool.equal(12, 6+6);
    });
    it('should fail', function () {
      let message = "Assertion error";
      try {
        assertTool.equal(12, 4, message);
      } catch (e) {
        assert.equal(e.message, message);
        return;
      }
      assert(false);
    });
    it('should fail with no message', function () {
      try {
        assertTool.equal(12, 4);
      } catch (e) {
        assert.equal(e.message, "");
        return;
      }
      assert(false);
    });
  });
});
