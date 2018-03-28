Operation = require("./operation").Operation

class CO extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }
}

module.exports.CO = CO;