Operation = require("./operation").Operation

class AN extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(10, AD, OD, OF, bullGamma)
  }
}

module.exports.AN = AN;
