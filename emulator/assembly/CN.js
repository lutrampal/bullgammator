Operation = require("./operation").Operation

class CN extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(9, AD, OD, OF, bullGamma)
  }
}

module.exports.CN = CN;