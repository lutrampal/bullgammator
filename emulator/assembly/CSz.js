Operation = require("./operation").Operation

class CSz extends Operation {
  constructor(OD, OF, bullGamma) {
    super(1, 13, OD, OF, bullGamma)
  }
}

module.exports.CSz = CSz;