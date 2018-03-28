Operation = require("./operation").Operation

class CD extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }
}

module.exports.CD = CD;