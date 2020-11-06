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
    throw Error("Received 48V - Nothing implemented");
  }

  /**
   * Function triggered by the instruction ES1
   */
  onStaticExtraction1(OD, OF) {
    // to be overridden
  }

  /**
   * Function triggered by the instruction ES1
   */
  onStaticExtraction2(OD, OF) {
    // to be overridden
  }
}

module.exports.ConnectedMachine = ConnectedMachine;
