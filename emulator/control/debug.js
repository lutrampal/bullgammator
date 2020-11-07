const assert = require('../tools/assert');

const MEMORY_MODE = require("../machine/constants").MEMORY_MODE;
const NB_CHRS_PER_WORD = require("../machine/constants").NB_CHRS_PER_WORD;
const NB_CHRS_PROGRAM_COUNTER = require("../machine/constants").NB_CHRS_PROGRAM_COUNTER;
const NB_COMMUTED_OCTADS = require("../machine/constants").NB_COMMUTED_OCTADS;
const NB_TRACK_GROUPS = require("../machine/constants").NB_TRACK_GROUPS;

const GET_ERROR_MESSAGE = "Cannot get invalid value.";
const SET_ERROR_MESSAGE = "Cannot set invalid value.";

class Debug {

  constructor(bullGamma) {
    assert(bullGamma, "A BullGamma instance must be provided.");
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
    return (n + '').padStart(width, z || '0');
  }

  /**
   * Return a string containing the value of the memory
   * @param id memory number
   * @param octad octad number
   * @return string
   * @throw Error in case of invalid value
   */
  getMemory(id, octad) {
    let value = "";
    this.bullGamma.getMemory(id, octad).blocks.forEach((val) => {
      value = Debug.hex(val) + value;
    });
    assert(Debug.banalMemoryValidate(value), GET_ERROR_MESSAGE);
    return value;
  }

  /**
   * Set the string value as value of the memory
   * @param value string or number representing the value of the memory
   * @param id memory number
   * @param octad octad number
   * @throw Error in case of invalid value
   */
  setMemory(value, id, octad) {
    value = Debug.pad(value, NB_CHRS_PER_WORD);
    assert(Debug.banalMemoryValidate(value), SET_ERROR_MESSAGE);
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
   * @throw Error in case of invalid value
   */
  getMode() {
    if (this.bullGamma._memoryMode === MEMORY_MODE.BINARY) {
      return "Binaire";
    }
    if (this.bullGamma._memoryMode === MEMORY_MODE.DECIMAL) {
      return "Décimal";
    }
    throw new Error(GET_ERROR_MESSAGE);
  }

  /**
   * Set the given string as new computation mode
   * @param value string that matches a mode
   * @throw Error in case of invalid value
   */
  setMode(value) {
    assert(Debug.modeValidate(value), SET_ERROR_MESSAGE);
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
   * @throw Error in case of invalid value
   */
  getNL() {
    let value = Debug.pad(
      Debug.hex((this.bullGamma.ns << 6) + this.bullGamma.nl),
      NB_CHRS_PROGRAM_COUNTER
    );
    assert(Debug.nlValidate(value), GET_ERROR_MESSAGE);
    return value;
  }

  /**
   * Sets a value of a correct program line number
   * @param value correct line number
   * @throw Error in case of invalid value
   */
  setNL(value) {
    value = Debug.pad(value, NB_CHRS_PROGRAM_COUNTER);
    assert(Debug.nlValidate(value), SET_ERROR_MESSAGE);
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
   * @throw Error in case of invalid value
   */
  getMS1() {
    let value = Debug.hex(this.bullGamma.ms1);
    assert(Debug.ms1Validate(value), GET_ERROR_MESSAGE);
    return value;
  }

  /**
   * Set a hex character of a correct sign memory value
   * @param value hex character or number < 10
   * @throw Error in case of invalid value
   */
  setMS1(value) {
    assert(Debug.ms1Validate(value), SET_ERROR_MESSAGE);
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
   * @throw Error in case of invalid value
   */
  getMD() {
    let value = Debug.hex(this.bullGamma.md);
    assert(Debug.mdValidate(value), GET_ERROR_MESSAGE);
    return value;
  }

  /**
   * Set a hex character of a correct shift memory value
   * @param value hex character or number < 10
   * @throw Error in case of invalid value
   */
  setMD(value) {
    assert(Debug.mdValidate(value), SET_ERROR_MESSAGE);
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
   * @throw Error in case of invalid value
   */
  setMCMP(value) {
    assert(Debug.mcmpValidate(value), SET_ERROR_MESSAGE);
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
   * @throw Error in case of invalid value
   */
  getRNL1() {
    let value = Debug.pad(Debug.hex(this.bullGamma.rnl1), NB_CHRS_PROGRAM_COUNTER);
    assert(Debug.nlValidate(value), GET_ERROR_MESSAGE);
    return value;
  }

  /**
   * Sets a value of a correct program line number in RNL1
   * @param value correct line number
   * @throw Error in case of invalid value
   */
  setRNL1(value) {
    value = Debug.pad(value, NB_CHRS_PROGRAM_COUNTER);
    assert(Debug.nlValidate(value), SET_ERROR_MESSAGE);
    this.bullGamma.rnl1 = Debug.reverseHex(value);
  }

  /**
   * Return a 2 characters string of the program line number
   * that was memorised in RNL2
   * @return string
   * @throw Error in case of invalid value
   */
  getRNL2() {
    let value = Debug.pad(Debug.hex(this.bullGamma.rnl2), NB_CHRS_PROGRAM_COUNTER);
    assert(Debug.nlValidate(value), GET_ERROR_MESSAGE);
    return value;
  }

  /**
   * Sets a value of a correct program line number in RNL2
   * @param value correct line number
   * @throw Error in case of invalid value
   */
  setRNL2(value) {
    value = Debug.pad(value, NB_CHRS_PROGRAM_COUNTER);
    assert(Debug.nlValidate(value), SET_ERROR_MESSAGE);
    this.bullGamma.rnl2 = Debug.reverseHex(value);
  }

  /**
   * Return a character that represents the current octad
   * @return string
   * @throw Error in case of invalid value
   */
  getOctad() {
    let value = Debug.hex(this.bullGamma.currentOctad.id);
    assert(Debug.octadValidate(value), GET_ERROR_MESSAGE);
    return value;
  }

  /**
   * Set a correct character as current octad value
   * @param value correct character of current octad value
   * @throw Error in case of invalid value
   */
  setOctad(value) {
    assert(Debug.octadValidate(value), SET_ERROR_MESSAGE);
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
   * @throw Error in case of invalid value
   */
  getTrackGr() {
    let value = Debug.hex(this.bullGamma.magneticDrum.commutedTrackGroup.id);
    assert(Debug.trackGrValidate(value), GET_ERROR_MESSAGE);
    return value;
  }

  /**
   * Set a correct character as current track group value
   * @param value correct character of current track group value
   * @throw Error in case of invalid value
   */
  setTrackGr(value) {
    assert(Debug.trackGrValidate(value), SET_ERROR_MESSAGE);
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
