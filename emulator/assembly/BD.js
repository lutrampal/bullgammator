Operation = require("./operation").Operation

class BD extends Operation {
  constructor(OD, OF, bullGamma) {
    super(7, 2, OD, OF, bullGamma)
  }

  execute() {
    this.bullGamma.md = this.bullGamma.getMemory(2).blocks[this.OD];
  }
}

module.exports.BD = BD;