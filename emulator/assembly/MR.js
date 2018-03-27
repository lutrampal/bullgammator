Operation = require("./operation").Operation

class MR extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(12, AD, OD, OF, bullGamma)
  }
}

module.exports.MR = MR;