Operation = require("./operation").Operation

class DC extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(15, AD, OD, OF, bullGamma)
  }
}

module.exports.DC = DC;