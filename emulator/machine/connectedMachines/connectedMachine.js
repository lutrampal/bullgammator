class ConnectedMachine {

  /**
   * Defines the Bull Gamma the machine is connected to
   * @param bullGamma instance of BullGamma
   */
  setBullGamma(bullGamma) {
    this.bullGamma = bullGamma;
  }

  /**
   * Function triggered by the instruction KB with AD=0
   */
  on48V() {
    // to be overridden
    throw new Error('You have to implement the method on48V.');
  }

  /**
   * Function triggered by the instruction ES1
   */
  onStaticExtraction1(OD, OF) {
    // to be overridden
    throw new Error('You have to implement the method onStaticExtraction1.');
  }

  /**
   * Function triggered by the instruction ES2
   */
  onStaticExtraction2(OD, OF) {
    // to be overridden
    throw new Error('You have to implement the method onStaticExtraction2.');
  }
}

module.exports.ConnectedMachine = ConnectedMachine;
