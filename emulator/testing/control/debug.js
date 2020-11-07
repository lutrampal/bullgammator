BullGamma = require("../../machine/bullGamma").BullGamma;
assert = require('assert');
Debug = require("../../control/debug").Debug;

describe('Debug', function() {
  describe('#constructor()', function () {
    it('should fail without bullGamma', function () {
      try {
        let debug = new Debug();
      } catch (e) {
        assert.equal(e.message, "A BullGamma instance must be provided.");
        return;
      }
      assert(false);
    });
  });
  describe('#hex()', function () {
    it('should convert number to hex digit', function () {
      assert.equal(Debug.hex(12), "C");
      assert.equal(Debug.hex(2), "2");
      assert.equal(Debug.hex(24), "18");
    });
  });
  describe('#reverseHex()', function () {
    it('should convert hex digit to number', function () {
      assert.equal(Debug.reverseHex("C"), 12);
      assert.equal(Debug.reverseHex("2"), 2);
      assert.equal(Debug.reverseHex("18"), 24);
    });
  });
  describe('#pad()', function () {
    it('should add zeros to the left', function () {
      assert.equal(Debug.pad(12, 4), "0012");
      assert.equal(Debug.pad("12", 4), "0012");
      assert.equal(Debug.pad("1Qx", 6, "-"), "---1Qx");
      assert.equal(Debug.pad("123456", 4), "123456"); // NB: exceeds the requested size
    });
  });
  describe('#getMemory()', function () {
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.getMemory(12, 4).blocks[2] = 12;
      assert.equal(debug.getMemory(12, 4), "000000000C00");
    });
    it('should raise an error', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.getMemory(12, 4).blocks[2] = 24;
      try {
        debug.getMemory(12, 4);
      } catch (e) {
        assert.equal(e.message, "Cannot get invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#setMemory()', function () {
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setMemory("014400000052", 12, 4);
      assert.equal(debug.getMemory(12, 4), "014400000052");
    });
    it('should raise error if incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setMemory("13GFHGMRHTS", 12, 4);
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#banalMemoryValidate()', function () {
    it('should tell if the content matches allowed format', function () {
      assert(Debug.banalMemoryValidate("01245FAB44B0"));
      assert(Debug.banalMemoryValidate("000000000000"));
      assert(!Debug.banalMemoryValidate("12567643K322"));
    });
  });
  describe('#set/getMode()', function () {
    it('should set binary mode', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setMode("Binaire");
      assert.equal(bullGamma._memoryMode, MEMORY_MODE.BINARY);
      assert.equal(debug.getMode(), "Binaire");
    });
    it('should set decimal mode', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setMode("Décimal");
      assert.equal(bullGamma._memoryMode, MEMORY_MODE.DECIMAL);
      assert.equal(debug.getMode(), "Décimal");
    });
    it('should not set incorrect mode', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setMode("Banana");
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
    it('should raise error getting invalid value', function () {
        let bullGamma = new BullGamma();
        let debug = new Debug(bullGamma);
        bullGamma._memoryMode = 12;
        try {
          debug.getMode();
        } catch (e) {
          assert.equal(e.message, "Cannot get invalid value.");
          return;
        }
        assert(false);
    });
  });
  describe('#modeValidate()', function () {
    it('should tell if the content matches allowed format', function () {
      assert(Debug.modeValidate("Binaire"));
      assert(Debug.modeValidate("Décimal"));
      assert(!Debug.modeValidate("Binary"));
      assert(!Debug.modeValidate("Banana"));
      assert(!Debug.modeValidate(12));
    });
  });
  describe('#getNL()', function () {
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.nl = 12;
      bullGamma.ns = 3;
      assert.equal(debug.getNL(), "CC");
    });
    it('should not get incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.nl = 12;
      bullGamma.ns = 5;
      try {
        debug.getNL();
      } catch (e) {
        assert.equal(e.message, "Cannot get invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#setNL()', function () {
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setNL("AB");
      assert.equal(debug.getNL(), "AB");
      assert.equal(bullGamma.nl, 43);
      assert.equal(bullGamma.ns, 2);
    });
    it('should not set incorrect nl', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setNL("AM");
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#nlValidate()', function () {
    it('should tell if the content matches allowed format', function () {
      assert(Debug.nlValidate("AB"));
      assert(Debug.nlValidate("0F"));
      assert(!Debug.nlValidate("A"));
      assert(!Debug.nlValidate("AM"));
    });
  });
  describe('#getMS1()', function () {
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.ms1 = 10;
      assert.equal(debug.getMS1(), "A");
    });
    it('should not get incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.ms1 = 25;
      try {
        debug.getMS1();
      } catch (e) {
        assert.equal(e.message, "Cannot get invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#setMS1()', function () {
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setMS1("A");
      assert.equal(debug.getMS1(), "A");
    });
    it('should raise error if incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setMS1("M");
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#ms1Validate()', function () {
    it('should tell if the content matches allowed format', function () {
      assert(Debug.ms1Validate("F"));
      assert(Debug.ms1Validate("0"));
      assert(!Debug.ms1Validate("K"));
    });
  });
  describe('#getMD()', function () {
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.md = 10;
      assert.equal(debug.getMD(), "A");
    });
    it('should not get incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.md = 25;
      try {
        debug.getMD();
      } catch (e) {
        assert.equal(e.message, "Cannot get invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#setMD()', function () {
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setMD("A");
      assert.equal(debug.getMD(), "A");
    });
    it('should raise error if incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setMD("M");
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#mdValidate()', function () {
    it('should tell if the content matches allowed format', function () {
      assert(Debug.mdValidate("F"));
      assert(Debug.mdValidate("0"));
      assert(!Debug.mdValidate("K"));
    });
  });
  describe('#getMCMP()', function () {
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.mc.equal = true;
      bullGamma.mc.greater = true;
      assert.equal(debug.getMCMP(), "=");
    });
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.mc.equal = false;
      bullGamma.mc.greater = true;
      assert.equal(debug.getMCMP(), ">");
    });
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.mc.equal = true;
      bullGamma.mc.greater = false;
      assert.equal(debug.getMCMP(), "=");
    });
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.mc.equal = false;
      bullGamma.mc.greater = false;
      assert.equal(debug.getMCMP(), "<");
    });
  });
  describe('#setMCMP()', function () {
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setMCMP("<");
      assert.equal(debug.getMCMP(), "<");
    });
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setMCMP(">");
      assert.equal(debug.getMCMP(), ">");
    });
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setMCMP("=");
      assert.equal(debug.getMCMP(), "=");
    });
    it('should raise error if incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setMCMP("M");
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#mcmpValidate()', function () {
    it('should tell if the content matches allowed format', function () {
      assert(Debug.mcmpValidate("<"));
      assert(Debug.mcmpValidate(">"));
      assert(Debug.mcmpValidate("="));
      assert(!Debug.mcmpValidate("K"));
    });
  });
  describe('#getRNL1()', function () {
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.rnl1 = 204;
      assert.equal(debug.getRNL1(), "CC");
    });
    it('should not get incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.rnl1 = 3045;
      try {
        debug.getRNL1();
      } catch (e) {
        assert.equal(e.message, "Cannot get invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#setRNL1()', function () {
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setRNL1("AB");
      assert.equal(debug.getRNL1(), "AB");
      assert.equal(bullGamma.rnl1, 171);
    });
    it('should not set incorrect nl', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setRNL1("AM");
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#getRNL2()', function () {
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.rnl2 = 204;
      assert.equal(debug.getRNL2(), "CC");
    });
    it('should not get incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.rnl2 = 2049;
      try {
        debug.getRNL2();
      } catch (e) {
        assert.equal(e.message, "Cannot get invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#setRNL2()', function () {
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setRNL2("AB");
      assert.equal(debug.getRNL2(), "AB");
      assert.equal(bullGamma.rnl2, 171);
    });
    it('should not set incorrect nl', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setRNL2("AM");
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#getOctad()', function () {
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.currentOctad.id = 4;
      assert.equal(debug.getOctad(), "4");
    });
    it('should not get incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.currentOctad.id = 9;
      try {
        debug.getOctad();
      } catch (e) {
        assert.equal(e.message, "Cannot get invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#setOctad()', function () {
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setOctad("4");
      assert.equal(debug.getOctad(), "4");
    });
    it('should raise error if incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setOctad("A");
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#octadValidate()', function () {
    it('should tell if the content matches allowed format', function () {
      assert(Debug.octadValidate("0"));
      assert(Debug.octadValidate("7"));
      assert(!Debug.octadValidate("8"));
      assert(!Debug.octadValidate("D"));
      assert(!Debug.octadValidate("K"));
    });
  });
  describe('#getTrackGr()', function () {
    it('should return the content of the memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.magneticDrum.commutedTrackGroup.id = 4;
      assert.equal(debug.getTrackGr(), "4");
    });
    it('should not get incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      bullGamma.magneticDrum.commutedTrackGroup.id = 10;
      try {
        debug.getTrackGr();
      } catch (e) {
        assert.equal(e.message, "Cannot get invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#setTrackGr()', function () {
    it('should set the content in memory', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      debug.setTrackGr("4");
      assert.equal(debug.getTrackGr(), "4");
    });
    it('should raise error if incorrect value', function () {
      let bullGamma = new BullGamma();
      let debug = new Debug(bullGamma);
      try {
        debug.setTrackGr("A");
      } catch (e) {
        assert.equal(e.message, "Cannot set invalid value.");
        return;
      }
      assert(false);
    });
  });
  describe('#trackGrValidate()', function () {
    it('should tell if the content matches allowed format', function () {
      assert(Debug.trackGrValidate("0"));
      assert(Debug.trackGrValidate("7"));
      assert(!Debug.trackGrValidate("8"));
      assert(!Debug.trackGrValidate("D"));
      assert(!Debug.trackGrValidate("K"));
    });
  });
});
