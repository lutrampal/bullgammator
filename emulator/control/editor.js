const assert = require('../tools/assert');

class Editor {
  constructor(bullGamma) {
    assert(bullGamma, "A BullGamma instance must be provided.");
    this.bullGamma = bullGamma;
  }

  /**
   * Sets the content of the Series3
   * @param hexCode hex code to be set
   */
  editSeries3(hexCode) {
    this.bullGamma.getSerie(3).setInstructions(hexCode);
  }

  /**
   * Sets the content of the drum
   * @param hexCode hex code to be set
   */
  editDrum(hexCode) {
    this.bullGamma.magneticDrum.setContent(hexCode);
  }
}

module.exports.Editor = Editor;
