Instruction = require("./instruction").Instruction

class ES extends Instruction {
	constructor(AD, OD, OF, bullGamma) {
		super(1, AD, OD, OF, bullGamma);
	}

	execute() {
		switch (this.AD) {
			case 8:
				for (let machine of this.bullGamma.connectedMachines) {
					machine.onStaticExtraction1(this.OD, this.OF);
				}
				break;
			case 9:
				for (let machine of this.bullGamma.connectedMachines) {
					machine.onStaticExtraction2(this.OD, this.OF);
				}
				break;
			default:
				break;
		}
	}

	getDescription() {
		return "ES" + (this.AD - 7) + " - Extraction Statique\n"
		+ "Envoie des données à une machine connectée";
	}
}

module.exports.ES = ES;
