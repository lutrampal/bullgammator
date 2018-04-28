const NB_BLOCKS_PER_MEMORY = 12;

assert = require('assert');
MEMORY_MODE = require("./bullGamma").MEMORY_MODE;

class Memory {
  constructor(id, bullGamma) {
    this._id = id;
    this.blocks = new Array(NB_BLOCKS_PER_MEMORY);
    this._bullGamma = bullGamma;
    this.setToZero(0, 12)
  }

  getMode() {
    return this._bullGamma.getMemoryMode();
  }

  toString() {
    let str = "";
    this.blocks.forEach(function (block) {
      str = block.toString(16) + str;
    })
    return str;
  }

  /**
   * Set every memory block in range to 0
   * @param from start index of the selected memory blocks, should be positive or zero
   * @param to end index (excluded) of the selected memory blocks, should be inferior to NB_BLOCKS_PER_MEMORY
   */
  setToZero(from, to) {
    assert.equal(from >= 0, true, "from parameter should be superior to 0");
    assert.equal(to <= NB_BLOCKS_PER_MEMORY, true, "to parameter should be inferior to " + NB_BLOCKS_PER_MEMORY);

    for (let i = from; i < to; i++) {
      this.blocks[i] = 0;
    }
  }

  /**
   * Set the selected memory block to the given value.
   * If in decimal mode and value is > 9, the value's digits are split then the lower one goes to blocks[idx] while
   * blocks[idx + 1] gets the higher one.
   * @param idx the idx of the the block that should be set, must be positive or zero but inferior to
   * NB_BLOCKS_PER_MEMORY
   * @param value the value to which the block should be set, must be positive or zero and inferior to 16.
   */
  setBlockValue(idx, value) {
    assert.equal(idx < NB_BLOCKS_PER_MEMORY, true, "idx should be inferior to " + NB_BLOCKS_PER_MEMORY);
    assert.equal(idx >= 0, true, "idx should be not be negative");
    assert.equal(value >= 0, true, "value should not be negative");
    assert.equal(value < 16, true, "value should be inferior to 16");

    switch (this.getMode()) {
      case MEMORY_MODE.BINARY:
        this._setBlockValueBinary(idx, value);
        break;
      case MEMORY_MODE.DECIMAL:
        this._setBlockValueDecimal(idx, value);
        break;
      default:
        throw "unknown memory mode: " + this.getMode();
    }
  }

  /**
   * Copy the selected values from an other memory
   * If the calculator is in decimal mode, only ten's complement values will be copied
   * @param other the other memory from which values will be copied
   * @param from which block index should the copy start from, should be positive and inferior to 12
   * @param to where should the copy end (excluded), should be inferior or equal to 12
   */
  copyBlockValues(other, from, to) {
    assert.equal(from >= 0, true, "from should be positive")
    assert.equal(to <= NB_BLOCKS_PER_MEMORY, true, "to should be inferior or equal to " + NB_BLOCKS_PER_MEMORY)
    for (let i = from; i < to; i++) {
      if (this.getMode() === MEMORY_MODE.DECIMAL && other.blocks[i] > 9) {
        this.blocks[i] = other.blocks[i] - 10
      } else {
        this.blocks[i] = other.blocks[i]
      }
    }
  }

  _setBlockValueBinary(idx, value) {
    this.blocks[idx] = value;
  }

  _setBlockValueDecimal(idx, value) {
    if (value <= 9) {
      this.blocks[idx] = value;
      return;
    }
    this.blocks[idx] = value % 10;
    this.blocks[(idx + 1) % NB_BLOCKS_PER_MEMORY] = 1;
  }

  /**
   * Every block in the memory gets the value of its right neighbour (index 0 gets value of index 11)
   */
  shiftLeft() {
    let buff = this.blocks[NB_BLOCKS_PER_MEMORY - 1]
    for (let i = NB_BLOCKS_PER_MEMORY - 1; i > 0; --i) {
      this.blocks[i] = this.blocks[i - 1]
    }
    this.blocks[0] = buff
  }

  /**
   * Every block in the memory gets the value of its left neighbour (index 11 gets value of index 0)
   */
  shiftRight() {
    let buff = this.blocks[0]
    for (let i = 0 ; i < NB_BLOCKS_PER_MEMORY - 1; ++i) {
      this.blocks[i] = this.blocks[i + 1]
    }
    this.blocks[NB_BLOCKS_PER_MEMORY - 1] = buff

  }

  /**
   * compare the whole memory to another one between selected blocks
   * @param other the other memory to which it should be compared
   * @param from the starting block from which the comparison should start
   * @param to the end block of the comparison (excluded)
   * @return an array of two booleans, index 0 is true if this is greater than other, index 1 is true if they are equal
   */
  compareTo(other, from, to) {
    assert.equal(from >= 0, true, "from should not be negative")
    assert.equal(from < to, true, "from should be inferior to to")
    assert.equal(to <= NB_BLOCKS_PER_MEMORY, true, "to should be inferior to the number of blocks per memory")
    let nbDigitsThis = NB_BLOCKS_PER_MEMORY;
    while (this.blocks[nbDigitsThis - 1] === 0 && nbDigitsThis > 0) {
      --nbDigitsThis
    }
    let nbDigitsOther = to - from;
    while (this.blocks[from + nbDigitsOther - 1] === 0 && nbDigitsOther > 0) {
      --nbDigitsOther
    }
    if (nbDigitsThis > nbDigitsOther) {
      return [true, false]
    }
    if (nbDigitsThis < nbDigitsOther) {
      return [false, false]
    }
    for (let i = 0; i < nbDigitsThis; ++i) {
      if (this.blocks[nbDigitsThis - i - 1] > other.blocks[to - i - 1]) {
        return [true, false]
      }
      if (this.blocks[nbDigitsThis - i - 1] < other.blocks[to - i - 1]) {
        return [false, false]
      }
    }
    return [false, true]
  }

  /**
   * add the given memory to this one
   * @param other the memory that should be added
   * @param from index of the block from which the addition should start
   * @param to index of the block to which the addition should end (excluded)
   */
  add(other, from, to) {
    assert.equal(from >= 0, true, "from should not be negative")
    assert.equal(from < to, true, "from should be inferior to to")
    assert.equal(to <= NB_BLOCKS_PER_MEMORY, true, "to should be inferior to the number of blocks per memory")
    let carry = 0
    for (let i = from; i < to; ++i) {
      let res = this.blocks[i] + other.blocks[i] + carry
      if (res > 9) {
        carry = 1
        res -= 10
      } else {
        carry = 0
      }
      this.blocks[i] = res
    }
    if (carry) {
      this.blocks[to%12] = carry
    }
  }

  /**
   * Add a value to any block of the memory, carrying out the result if in decimal mode.
   * @param value the value to add, must be between -16 and 16
   * @param at the block index to which the value should be added
   */
  addValue(value, at) {
    assert.equal(value > -16, true, "value should be superior to -16")
    assert.equal(value < 16, true, "value should be inferior to 16")
    assert.equal(at < NB_BLOCKS_PER_MEMORY, true, "at should be inferior to the number of blocks per memory")
    this.blocks[at] = Math.abs(this.blocks[at] + value);
    if (this.blocks[at] > 9) {
      this.blocks[(at + 1)%NB_BLOCKS_PER_MEMORY] = 1
      this.blocks[at] -= 10
    }
  }

  /**
   * return the unsigned decimal value of this memory between the selected blocks (decimal mode only)
   * @param from the starting block from which the value should be computed
   * @param to the ending block (excluded)
   * @return {number} the computed value
   */
  getDecimalValue(from, to) {
    assert.equal(from >= 0, true, "from should not be negative")
    assert.equal(from < to, true, "from should be smaller than to")
    assert.equal(to <= NB_BLOCKS_PER_MEMORY, true, "to should not be greater than the number of blocks per memory")
    assert.equal(this.getMode(), MEMORY_MODE.DECIMAL, "the bullgamma should be in decimal mode")
    let val = 0;
    let mult = 1;
    for (let i = from; i < to; ++i) {
      val += this.blocks[i]*mult
      mult *= 10
    }
    return val
  }

  /**
   * set the value of the memory between the selected blocks
   * @param value
   * @param from
   * @param to
   */
  setDecimalValue(value, from, to) {
    assert.equal(from >= 0, true, "from should not be negative")
    assert.equal(from < to, true, "from should be smaller than to")
    assert.equal(value >= 0, true, "value should be an absolute value")
    assert.equal(to <= NB_BLOCKS_PER_MEMORY, true, "to should not be greater than the number of blocks per memory")
    assert.equal(this.getMode(), MEMORY_MODE.DECIMAL, "the bullgamma should be in decimal mode")
    let digits = (value).toString(10).split("").map(Number).reverse()
    let i = 0
    for (; i + from < to && i < digits.length; ++i) {
      this.blocks[from + i] = digits[i];
    }
    for (; i + from < to ; ++i) {
      this.blocks[from + i] = 0
    }
  }

  /**
   * subtract the given memory to this one
   * @param other the memory that should be subtracted
   * @param from index of the block from which the subtraction should start
   * @param to index of the block to which the subtraction should end (excluded)
   */
  subtract(other, from, to) {
    assert.equal(from >= 0, true, "from should not be negative")
    assert.equal(from < to, true, "from should be inferior to to")
    assert.equal(to < NB_BLOCKS_PER_MEMORY, true, "to should be inferior to the number of blocks per memory")
    let valM1 = this.getDecimalValue(from, to) - other.getDecimalValue(from, to)
    this.setDecimalValue(Math.abs(valM1), from, to)
    if (valM1 < 0) {
      this._bullGamma.ms1 = 10;
    }
  }
}

module.exports.NB_BLOCKS_PER_MEMORY = NB_BLOCKS_PER_MEMORY;
module.exports.Memory = Memory;