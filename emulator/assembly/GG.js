Operation = require("./operation").Operation

class GG extends Operation {
  constructor(OD, OF, bullGamma) {
    super(5, 0, OD, OF, bullGamma)
  }
}

module.exports.GG = GG;