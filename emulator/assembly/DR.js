Operation = require("./operation").Operation

class DR extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(13, AD, OD, OF, bullGamma)
  }
}

module.exports.DR = DR;