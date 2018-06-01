assert = require('assert');
Word = require("../word").Word

const NB_HEX_VALUES_PER_DRUM_BLOCK = require("../constants").NB_HEX_VALUES_PER_DRUM_BLOCK
const NB_WORD_PER_DRUM_BLOCK = require("../constants").NB_WORD_PER_DRUM_BLOCK

/**
 * A DrumBlock is a set of NB_WORD_PER_DRUM_BLOCK that belongs to a DrumTrack
 */
class DrumBlock {

  /**
	 * constructs a new DrumBlock
   * @param id the ID of this block
   * @param track the track to which this block is attached
   */
  constructor(id, track) {
    this.id = id;
    this.track = track;
		this.words = new Array(NB_WORD_PER_DRUM_BLOCK);
		for (let w=0; w<NB_WORD_PER_DRUM_BLOCK; w++) {
			this.words[w] = new Word();
		}
  }

  /**
   * Set the Word's content with hex values
   * @param hexCode a String that represents the new hex values of this Word
   */
  setContent(hexCode) {
    hexCode = hexCode.replace(/[\s\n\r\t]/g, ''); // remove white space and line breaks
    assert(hexCode.length <= NB_HEX_VALUES_PER_DRUM_BLOCK,
			"hexCode should be of length " + NB_HEX_VALUES_PER_DRUM_BLOCK);
		hexCode = hexCode.padEnd(NB_HEX_VALUES_PER_DRUM_BLOCK, "0");
		for (let w=0; w<NB_WORD_PER_DRUM_BLOCK; w++) {
			this.words[w].setContent(hexCode.substr(w*NB_CHRS_PER_WORD, NB_CHRS_PER_WORD));
		}
  }

	/**
	 * Returns the word corresponding to the id
	 * @param id from 0 to 15
	 */
	getWord(id) {
		return this.words[id];
	}

  toString() {
    let str = "";
		for (let w=0; w<NB_WORD_PER_DRUM_BLOCK; w++) {
			str += this.words[w].toString();
			if (w % 4 == 3) {
				str += "\n";
			} else {
				str += "\t";
			}
		}
    return str;
  }
}

module.exports.DrumBlock = DrumBlock;
