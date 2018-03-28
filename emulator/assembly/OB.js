Operation = require("./operation").Operation

class OB extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(8, AD, OD, OF, bullGamma)
  }
}

module.exports.OB = OB;