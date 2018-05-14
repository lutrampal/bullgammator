assert = require('assert');
Word = require("./word").Word;

const NB_CHRS_PER_WORD = require("./constants").NB_CHRS_PER_WORD;
MEMORY_MODE = require("./constants").MEMORY_MODE;


class Memory extends Word {
  constructor(id, bullGamma, nb_blocks = NB_CHRS_PER_WORD) {
		super(nb_blocks);
    this.id = id;
    this.bullGamma = bullGamma;
  }

  getMode() {
    return this.bullGamma.getMemoryMode();
  }

	/**
	 * Set every memory block in range to 0
	 * @param from start index of the selected memory blocks, should be positive or zero
	 * @param to end index (excluded) of the selected memory blocks, should be inferior to NB_CHRS_PER_WORD
	 */
	setToZero(from, to) {
		assert.equal(from >= 0, true, "from parameter should be superior to 0");
		assert.equal(to <= this.blocks.length, true, "to parameter should be inferior to " + this.blocks.length);

		for (let i = from; i < to; i++) {
			this.blocks[i] = 0;
		}
	}

  /**
   * Set the selected memory block to the given value.
   * If in decimal mode and value is > 9, the value's digits are split then the lower one goes to blocks[idx] while
   * blocks[idx + 1] gets the higher one.
   * @param idx the idx of the the block that should be set, must be positive or zero but inferior to
   * NB_CHRS_PER_WORD
   * @param value the value to which the block should be set, must be positive or zero and inferior to 16.
   */
  setBlockValue(idx, value) {
    assert.equal(idx < this.blocks.length, true, "idx should be inferior to " + this.blocks.length);
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

	_setBlockValueBinary(idx, value) {
		this.blocks[idx] = value;
	}

	_setBlockValueDecimal(idx, value) {
		if (value <= 9) {
			this.blocks[idx] = value;
			return;
		}
		this.blocks[idx] = value % 10;
		this.blocks[(idx + 1) % this.blocks.length] = 1;
	}

  /**
   * Copy the selected values from an other memory
   * If the calculator is in decimal mode, only ten's complement values will be copied
   * @param other the other memory from which values will be copied
   * @param from which block index should the copy start from, should be positive and inferior to 12
   * @param to where should the copy end (excluded), should be inferior or equal to 12
   */
  copyBlockValues(other, from=0, to=this.blocks.length, ignore_mode=false) {
    assert.equal(from >= 0, true, "from should be positive");
    assert.equal(to <= this.blocks.length, true, "to should be inferior or equal to " + this.blocks.length);

    for (let i = from; i < to; i++) {
      if (this.getMode() === MEMORY_MODE.DECIMAL && other.blocks[i] > 9) {
        this.blocks[i] = other.blocks[i] - 10
      } else {
        this.blocks[i] = other.blocks[i]
      }
    }
  }

  /**
   * Every block in the memory gets the value of its right neighbour (index 0 gets value of index 11)
   */
  shiftLeft() {
    let buff = this.blocks[this.blocks.length - 1]
    for (let i = this.blocks.length - 1; i > 0; --i) {
      this.blocks[i] = this.blocks[i - 1]
    }
    this.blocks[0] = buff
  }

  /**
   * Every block in the memory gets the value of its left neighbour (index 11 gets value of index 0)
   */
  shiftRight() {
    let buff = this.blocks[0]
    for (let i = 0 ; i < this.blocks.length - 1; ++i) {
      this.blocks[i] = this.blocks[i + 1]
    }
    this.blocks[this.blocks.length- 1] = buff

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
    assert.equal(to <= this.blocks.length, true, "to should be inferior to the number of blocks per memory")
    let nbDigitsThis = this.blocks.length;
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
   * @param overriding_carry if true, at the end of the addition, the resulting carry out will override the next
   * memory block if it is not null. Otherwise it will be added to the next memory block.
   */
  add(other, from, to, overriding_carry = true) {
    assert.equal(from >= 0, true, "from should not be negative")
    assert.equal(from < to, true, "from should be inferior to to")
    assert.equal(to <= this.blocks.length, true, "to should be inferior to the number of blocks per memory")
    let carry = 0
    for (let i = from; i < to || carry === 1 && !overriding_carry; i++) {
      let other_val = i < to ? other.blocks[i] : 0
      let res = this.blocks[i%this.blocks.length + (this.blocks.length - NB_CHRS_PER_WORD)] + other_val + carry
			if (res >= this.getMode().base) {
				carry = 1
				res -= this.getMode().base
			} else {
				carry = 0
			}
      this.blocks[i%this.blocks.length + (this.blocks.length - NB_CHRS_PER_WORD)] = res
    }
    if (overriding_carry && carry) {
      this.blocks[to%this.blocks.length] += carry
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
    assert.equal(at < this.blocks.length, true, "at should be inferior to the number of blocks per memory")
    this.blocks[at] = Math.abs(this.blocks[at] + value);
    for (let i = at; this.blocks[i] >= this.getMode().base; i = (i + 1)%this.blocks.length) {
      this.blocks[(i + 1) % this.blocks.length]++
      this.blocks[i] -= this.getMode().base
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
    assert.equal(to <= this.blocks.length, true, "to should not be greater than the number of blocks per memory")
    let val = 0;
    let mult = 1;
    for (let i = from; i < to; ++i) {
      val += this.blocks[i]*mult
      mult *= this.getMode().base
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
    assert.equal(to <= this.blocks.length, true, "to should not be greater than the number of blocks per memory")
    let digits = (value).toString(this.getMode().base).split("").map(
			(chr) => parseInt(chr, this.getMode().base)
		).reverse()
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
  subtract(other, from = 0, to = this.blocks.length, this_from = from, this_to = to) {
    assert.equal(from >= 0, true, "from should not be negative")
    assert.equal(from < to, true, "from should be inferior to to")
    assert.equal(to <= this.blocks.length, true, "to should be inferior to the number of blocks per memory")
		let valM1 = this.getDecimalValue(this_from, this_to) - other.getDecimalValue(from, to)
		this.setDecimalValue(Math.abs(valM1), this_from, this_to)
		if (valM1 < 0 && this.getMode() === MEMORY_MODE.DECIMAL) {
			this.bullGamma.ms1 = 10;
		}
  }

  multiply(other, from, to) {
    while (this.bullGamma.md !== 0) {
      if (this.blocks[0] === 0) {
        this.shiftRight()
        this.bullGamma.md--
      } else {
        this.blocks[0]--
        this.add(other, from, to, false)
      }
    }
  }

  multiplyValue(value, at) {
    while (this.bullGamma.md !== 0) {
      if (this.blocks[0] === 0) {
        this.shiftRight()
        this.bullGamma.md--
      } else {
        this.blocks[0]--
        this.addValue(value, at)
      }
    }
  }

  divide(other, from, to) {
    let vmb = other.getDecimalValue(from, to)
    if (vmb === 0) {
      throw new Error("Divide by 0")
    }
    while (this.bullGamma.md > 0) {
      while (this.getDecimalValue(from + this.blocks.length - NB_CHRS_PER_WORD, this.blocks.length) < vmb
                && this.bullGamma.md > 0) {
        this.shiftLeft()
        this.bullGamma.md--
      }
      while (this.getDecimalValue(from + this.blocks.length - NB_CHRS_PER_WORD, this.blocks.length) >= vmb) {
        this.blocks[0]++
        this.subtract(other, from, to, from + this.blocks.length - NB_CHRS_PER_WORD, this.blocks.length)
      }
    }
  }

  divideValue(value, at) {
    let mb = new Memory(0, this.bullGamma, NB_CHRS_PER_WORD)
    mb.blocks[at] = value
    this.divide(mb, 0, at + 1)
  }
}

module.exports.Memory = Memory;
