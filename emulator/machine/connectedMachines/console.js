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
	on48V() {
		let i = NB_MEMORIES_PER_HALF_OCTAD;
		for (let ex of this.bullGamma.getExtractors()) {
			this.lines.push(
				"Sortie "+ i - NB_MEMORIES_PER_HALF_OCTAD + ": " + ex.toString()
			);
			i++;
		}
	}

	/**
	 * Function triggered by the instruction ES1
	 */
	onStaticExtraction1(OD, OF) {
		let extractors = this.bullGamma.getExtractors();
		// first extractor is used for error
		// other for standard outputs
		let nb_errors = 1;
		
		switch (OD) {
			case 0:
				// display outputs
				if (OF < extractors.length - nb_errors) {
					this.lines.push(
						"Sortie "+ OF + ": " + extractors[OF + nb_errors].toString()
					);
				}
				break;
			case 1:
				// display errors
				if (OF < nb_errors) {
					this.lines.push(
						"Erreur: " + extractors[OF].toString()
					);
				}
				break;
			default:
				break;
		}
	}

	/**
	 * Function triggered by the instruction ES1
	 */
	onStaticExtraction2(OD, OF) {
		// nothing yet
	}

	/**
	 * Returns the list of lines printed to the console
	 * @returns String[]
	 */
	getLines() {
		return this.lines;
	}

	/**
	 * Adds a line to the console
	 * @param line string to be added
	 */
	push(line) {
		this.lines.push(line);
	}
}

module.exports.Console = Console;
