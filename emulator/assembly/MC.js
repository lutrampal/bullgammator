Operation = require("./operation").Operation

class MC extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(14, AD, OD, OF, bullGamma)
  }
}

module.exports.MC = MC;