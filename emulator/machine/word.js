assert = require('assert');

const NB_CHRS_PER_WORD = require("./constants").NB_CHRS_PER_WORD;

/**
 * A Word is a memory unit which contains, by default, NB_CHRS_PER_WORD hexadecimal values
 */
class Word {

  /**
   * constructs a new instance of Word
   * @param nb_blocks the number of hexadecimal values held by this Word
   */
  constructor(nb_blocks = NB_CHRS_PER_WORD) {
    this.blocks = new Array(nb_blocks);
    this.resetWord();
  }

  /**
   * Set the Word's content with hex values
   * @param hexCode a String that represents the new hex values of this Word
   */
  setContent(hexCode) {
    assert(hexCode.length <= this.blocks.length, "hexCode should be shorter than " + (this.blocks.length + 1) + " chars");
    hexCode = "0".repeat(this.blocks.length - hexCode.length) + hexCode;
    for (let i = hexCode.length - 1, j = 0; j < hexCode.length; i--, j++) {
      this.blocks[i] = parseInt(hexCode.charAt(j), 16)
    }
  }

  toString() {
    let str = "";
    this.blocks.forEach(function (block) {
      str = block.toString(16) + str;
    });
    return str.toUpperCase();
  }

  /**
   * Set every memory block in range to 0
   * @param from start index of the selected memory blocks, should be positive or zero
   * @param to end index (excluded) of the selected memory blocks, should be inferior to NB_CHRS_PER_WORD
   */
  resetWord() {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i] = 0;
    }
  }

  /**
   * Copy the selected values from an other memory
   * If the calculator is in decimal mode, only ten's complement values will be copied
   * @param other the other memory from which values will be copied
   * @param from which block index should the copy start from, should be positive and inferior to 12
   * @param to where should the copy end (excluded), should be inferior or equal to 12
   */
  copy(other) {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i] = other.blocks[i];
    }
  }
}

module.exports.Word = Word;
