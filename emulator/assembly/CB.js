Operation = require("./operation").Operation

class CB extends Operation {
  constructor(OD, OF, bullGamma) {
    super(1, 15, OD, OF, bullGamma)
  }
}

module.exports.CB = CB;