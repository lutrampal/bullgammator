Operation = require("./operation").Operation

class IL extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(7, AD, OD, OF, bullGamma)
  }
}

module.exports.IL = IL;