Operation = require("./operation").Operation

class BO extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(6, AD, OD, OF, bullGamma)
  }
}

module.exports.BO = BO;