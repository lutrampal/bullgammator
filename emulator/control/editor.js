class Editor {
  constructor(bullGamma) {
    this.bullGamma = bullGamma;
  }

  /**
   * Sets the content of the connexionArray
   * @param hexCode hex code to be set
   */
  editConnexionArray(hexCode) {
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
