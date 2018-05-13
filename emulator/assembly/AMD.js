Instruction = require("./instruction").Instruction

class AMD extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(7, 0, OD, OF, bullGamma)
  }

  execute() {
    this.bullGamma.md = this.OF;
  }

	getDescription() {
		return "Met la mémoire de décalage à " + this.OF;
	}
}

module.exports.AMD = AMD;
