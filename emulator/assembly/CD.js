Operation = require("./operation").Operation
MEMORY_MODE = require("../machine/constants").MEMORY_MODE

class CD extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }

  execute() {
    this.bullGamma._memoryMode = MEMORY_MODE.DECIMAL
  }
}

module.exports.CD = CD;