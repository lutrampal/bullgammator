Operation = require("./operation").Operation

class SN extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(11, AD, OD, OF, bullGamma)
  }
}

module.exports.SN = SN;