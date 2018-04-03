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

  add(other) {
    if (this.getMode() === 2) {
      this._binaryAdd(other);
    }
    if (this.getMode() === 10) {
      this._decimalAdd(other);
    }
  }

  sub(other) {

  }

  toString() {
    let str = "";
    this.blocks.forEach(function (block) {
      str = block.toString(16) + str;
    })
    return str;
  }

  _binaryAdd(other) {
    let carry = 0;
    let i = 0;
    for (; i < 12; ++i) {
      this.blocks[i] += other.blocks[i] + carry;
      if (this.blocks[i] > 15) {
        carry = 1;
        this.blocks[i] = this.blocks[i] % 16;
      } else {
        carry = 0;
      }
    }
    while (carry !== 0) {
      this.blocks[i] += carry;
      if (this.blocks[i] > 15) {
        carry = 1;
        this.blocks[i] = this.blocks[i] % 16;
      } else {
        carry = 0;
      }
    }
  }

  _decimalAdd(other) {

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
    for (i = from; i < to; i++) {
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
   * compare the memory to another one between the selected blocks
   * @param other the other memory to which it should be compared
   * @param from the starting block from which the comparison should start
   * @param to the end block of the comparison (excluded)
   * @return an array of two booleans, index 0 is true if this is greater than other, index 1 is true if they are equal
   */
  compareTo(other, from, to) {

  }
}

module.exports.NB_BLOCKS_PER_MEMORY = NB_BLOCKS_PER_MEMORY;
module.exports.Memory = Memory;