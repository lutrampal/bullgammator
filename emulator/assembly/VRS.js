Operation = require("./operation").Operation

class VRS extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }
}

module.exports.VRS = VRS;