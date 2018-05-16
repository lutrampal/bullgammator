ConnectedMachine = require('./connectedMachine').ConnectedMachine;
NB_MEMORIES_PER_HALF_OCTAD = require('../constants').NB_MEMORIES_PER_HALF_OCTAD;

/**
 * NB: This connected machine is not an actual device af the Bull Gamma
 µ It is used for debug purposes only
 */
class Console extends ConnectedMachine {

	constructor() {
		super();
		this.lines = [];
	}

	/**
	 * Function triggered by an instruction of the Bull Gamma
	 */
	doStuff() {
		let i = NB_MEMORIES_PER_HALF_OCTAD;
		for (let ex of this.bullGamma.getExtractors()) {
			this.lines.push("Sortie "+ i + ": " + ex.toString());
			i++;
		}
	}

	/**
	 * Returns the list of lines printed to the console
	 * @returns String[]
	 */
	getLines() {
		return this.lines;
	}
}

module.exports.Console = Console;
