class ConnectedMachine {

	/**
	 * Defines the Bull Gamma the machine is connected to
	 * @param bullGamma instance of BullGamma
	 */
	setBullGamma(bullGamma) {
		this.bullGamma = bullGamma;
	}

	/**
	 * Function triggered by an instruction of the Bull Gamma
	 */
	doStuff() {
		throw "Not implemented";
	}
}

module.exports.ConnectedMachine = ConnectedMachine;
