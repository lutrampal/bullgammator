const NB_BLOCKS_PER_MEMORY = 12;

assert = require('assert');

class Memory {
  constructor(id) {
    this._id = id;
    this.blocks = new Array(NB_BLOCKS_PER_MEMORY);
  }

  getMode() {
    return bullGamma.getMemoryMode();
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
   * @param from start index of the selected memory blocks, should be superior to 0
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
   * If in decimal mode, the exceeding count will be reported to the following block in memory.
   * @param idx the idx of the the block that should be set, must be superior to zero but inferior to
   * NB_BLOCKS_PER_MEMORY
   * @param value the value to which the block should be set, must be inferior to 16.
   */
  setBlockValue(idx, value) {

  }
}

module.exports.NB_BLOCKS_PER_MEMORY = NB_BLOCKS_PER_MEMORY;
module.exports.Memory = Memory;