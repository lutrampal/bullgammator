const MEMORY_MODE = require("../machine/constants").MEMORY_MODE;
const NB_CHRS_PER_WORD = require("../machine/constants").NB_CHRS_PER_WORD;
const NB_CHRS_PROGRAM_COUNTER = require("../machine/constants").NB_CHRS_PROGRAM_COUNTER;
const NB_COMMUTED_OCTADS = require("../machine/constants").NB_COMMUTED_OCTADS;
const NB_TRACK_GROUPS = require("../machine/constants").NB_TRACK_GROUPS;

class Debug {

  constructor(bullGamma) {
    this.bullGamma = bullGamma;
  }

  /**
   * Tool function that tranforms a number into hex string
   * @param number
   * @return string
   */
  static hex(number) {
    return number.toString(16).toUpperCase();
  }

  /**
   * Tool function that parse a number from a hex character
   * @param char hex character to parse
   * @return number
   */
  static reverseHex(char) {
    return parseInt(char, 16);
  }

  /**
   * Tool function that completes a given number or string
   * with a given character by the left
   * until its width matches the given width
   * @param n number or string to complete
   * @param width width of the returned string
   * @param z optional character to complete with, '0' by default
   * @return string
   */
  static pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  /**
   * Return a string containing the value of the memory
   * @param id memory number
   * @param octad octad number
   * @return string
   */
  getMemory(id, octad) {
    let value = "";
    this.bullGamma.getMemory(id, octad).blocks.forEach((val) => {
      value = Debug.hex(val) + value;
    });
    return Debug.pad(value, NB_CHRS_PER_WORD);
  }

  /**
   * Set the string value as value of the memory
   * @param value string or number representing the value of the memory
   * @param id memory number
   * @param octad octad number
   */
  setMemory(value, id, octad) {
    value = Debug.pad(value, NB_CHRS_PER_WORD);
    if (!Debug.banalMemoryValidate(value)) {
      return;
    }
    let mem = this.bullGamma.getMemory(id, octad);
    for (var i = 0; i < 12; i++) {
      mem.blocks[11 - i] = Debug.reverseHex(value.charAt(i));
    }
  }

  /**
   * Return true if the value is a correct value for banal memory
   * @param value value to test
   * @return boolean
   */
  static banalMemoryValidate(value) {
    return value.match(/^[0-9A-F]{12}$/);
  }

  /**
   * Return a string representing the computation mode (decimal or binary)
   * @return string
   */
  getMode() {
    if (this.bullGamma._memoryMode === MEMORY_MODE.BINARY) {
      return "Binaire";
    }
    if (this.bullGamma._memoryMode === MEMORY_MODE.DECIMAL) {
      return "Décimal";
    }
  }

  /**
   * Set the given string as new computation mode
   * @param value string that matches a mode
   */
  setMode(value) {
    if (!Debug.modeValidate(value)) {
      return;
    }
    if (value == "Binaire") {
      this.bullGamma._memoryMode = MEMORY_MODE.BINARY;
    }
    if (value == "Décimal") {
      this.bullGamma._memoryMode = MEMORY_MODE.DECIMAL;
    }
  }

  /**
   * Return true if the given value for computation mode is correct
   * @param value mode value to test
   * @return boolean
   */
  static modeValidate(value) {
    if (value == "Binaire") {
      return true;
    }
    if (value == "Décimal") {
      return true;
    }
    return false;
  }

  /**
   * Return a 2 characters string of the program line number
   * @return string
   */
  getNL() {
    return Debug.pad(
      Debug.hex((this.bullGamma.ns << 6) + this.bullGamma.nl),
      NB_CHRS_PROGRAM_COUNTER
    );
  }

  /**
   * Sets a value of a correct program line number
   * @param value correct line number
   */
  setNL(value) {
    value = Debug.pad(value, NB_CHRS_PROGRAM_COUNTER);
    if (!Debug.nlValidate(value)) {
      return;
    }
    this.bullGamma.nl = Debug.reverseHex(value) % 64;
    this.bullGamma.ns = Debug.reverseHex(value) >> 6;
  }

  /**
   * Return true if the value of line number is correct
   * @param value line number to test
   * @return boolean
   */
  static nlValidate(value) {
    return value.match(/^[0-9A-F]{2}$/);
  }

  /**
   * Return a hex character of the value of the sign memory
   * @return string
   */
  getMS1() {
    return Debug.hex(this.bullGamma.ms1);
  }

  /**
   * Set a hex character of a correct sign memory value
   * @param value hex character or number < 10
   */
  setMS1(value) {
    if (!Debug.ms1Validate(value)) {
      return;
    }
    this.bullGamma.ms1 = Debug.reverseHex(value);
  }

  /**
   * Return true if the value of sign memory is correct
   * @param value sign memory to test
   * @return boolean
   */
  static ms1Validate(value) {
    return value.match(/^[0-9A-F]$/);
  }

  /**
   * Return a hex character of the value of the shift memory
   * @return string
   */
  getMD() {
    return Debug.hex(this.bullGamma.md);
  }

  /**
   * Set a hex character of a correct shift memory value
   * @param value hex character or number < 10
   */
  setMD(value) {
    if (!Debug.mdValidate(value)) {
      return;
    }
    this.bullGamma.md = Debug.reverseHex(value);
  }

  /**
   * Return true if the value of shift memory is correct
   * @param value shift memory to test
   * @return boolean
   */
  static mdValidate(value) {
    return value.match(/^[0-9A-F]$/);
  }

  /**
   * Return a character that represents the state
   * of the comparison memory
   * @return string
   */
  getMCMP() {
    let mc = this.bullGamma.mc;
    let value = "";
    if (mc.equal) {
      return "=";
    } else {
      if (mc.greater) {
        return ">";
      } else {
        return "<";
      }
    }
  }

  /**
   * Set a correct character as comparison memory value
   * @param value correct character of comparison memory value
   */
  setMCMP(value) {
    if (!Debug.mcmpValidate(value)) {
      return;
    }
    let mc = this.bullGamma.mc;
    if (value == "=") {
      mc.equal = true;
    } else {
      mc.equal = false;
      if (value == ">") {
        mc.greater = true;
      } else {
        mc.greater = false;
      }
    }
  }

  /**
   * Return true if the given value is a correct value for comparison memory
   * @param value value to test
   * @return boolean
   */
  static mcmpValidate(value) {
    return value.match(/^(=|<|>)$/);
  }

  /**
   * Return a 2 characters string of the program line number
   * that was memorised in RNL1
   * @return string
   */
  getRNL1() {
    return Debug.pad(Debug.hex(this.bullGamma.rnl1), NB_CHRS_PROGRAM_COUNTER);
  }

  /**
   * Sets a value of a correct program line number in RNL1
   * @param value correct line number
   */
  setRNL1(value) {
    value = Debug.pad(value, NB_CHRS_PROGRAM_COUNTER);
    if (!Debug.nlValidate(value)) {
      return;
    }
    this.bullGamma.rnl1 = Debug.reverseHex(value);
  }

  /**
   * Return a 2 characters string of the program line number
   * that was memorised in RNL2
   * @return string
   */
  getRNL2() {
    return Debug.pad(Debug.hex(this.bullGamma.rnl2), NB_CHRS_PROGRAM_COUNTER);
  }

  /**
   * Sets a value of a correct program line number in RNL2
   * @param value correct line number
   */
  setRNL2(value) {
    value = Debug.pad(value, NB_CHRS_PROGRAM_COUNTER);
    if (!Debug.nlValidate(value)) {
      return;
    }
    this.bullGamma.rnl2 = Debug.reverseHex(value);
  }

  /**
   * Return a character that represents the current octad
   * @return string
   */
  getOctad() {
    return Debug.hex(this.bullGamma.currentOctad.id);
  }

  /**
   * Set a correct character as current octad value
   * @param value correct character of current octad value
   */
  setOctad(value) {
    if (!Debug.octadValidate(value)) {
      return;
    }
    this.bullGamma.setCommutedOctad(Debug.reverseHex(value));
  }

  /**
   * Return true if the given value is a correct value for current octad
   * @param value value to test
   * @return boolean
   */
  static octadValidate(value) {
    return value.match(/^[0-7]$/);
  }

  /**
   * Return a character that represents the current track group
   * @return string
   */
  getTrackGr() {
    return Debug.hex(this.bullGamma.magneticDrum.commutedTrackGroup.id);
  }

  /**
   * Set a correct character as current track group value
   * @param value correct character of current track group value
   */
  setTrackGr(value) {
    if (!Debug.trackGrValidate(value)) {
      return;
    }
    this.bullGamma.magneticDrum.setCommutedGroup(Debug.reverseHex(value));
  }

  /**
   * Return true if the given value is a correct value for current track group
   * @param value value to test
   * @return boolean
   */
  static trackGrValidate(value) {
    return value.match(/^[0-7]$/);
  }

}

exports.Debug = Debug;
