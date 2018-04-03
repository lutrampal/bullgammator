Operation = require("./operation").Operation

class AMD extends Operation {
  constructor(OD, OF, bullGamma) {
    super(7, 0, OD, OF, bullGamma)
  }

  execute() {
    this.bullGamma.md = this.OF;
  }
}

module.exports.AMD = AMD;