assert = require('assert');
CodeLibrary = require("../../control/code_lib").CodeLibrary;

describe('CodeLibrary', function() {
  describe('#getProgramsNames()', function () {
    it('should list the programs by filename', function () {
      let lib = new CodeLibrary();
      console.log(lib.getProgramsNames());
      let exists = false;
      for (let name of lib.getProgramsNames()) {
        if (name === "racine_carree") {
          exists = true;
        }
      }
      assert(exists);
    });
  });
  describe('#getProgram()', function () {
    it('should get the correct part of empty string', function () {
      let lib = new CodeLibrary();
      let name = "racine_carree";
      assert.equal(lib.getProgram(name, "m3"), "014400000052");
      assert.equal(lib.getProgram(name, "m1"), "");
      assert.equal(lib.getProgram(name, "banana split"), "");
      assert.equal(lib.getProgram(name, "drum"), "");
      assert.notEqual(lib.getProgram(name, "series3"), "");
      assert.notEqual(lib.getProgram(name, "description"), "");
    });
  });
  describe('#getDisplayName()', function () {
    it('should get the correct part of empty string', function () {
      let lib = new CodeLibrary();
      assert.equal(lib.getDisplayName("racine_carree"), "Racine Carree");
      assert.equal(lib.getDisplayName("coucou_les_chatons_3"), "Coucou Les Chatons 3");
    });
  });
});
