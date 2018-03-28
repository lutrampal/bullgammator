Operation = require("./operation").Operation

class BD extends Operation {
  constructor(OD, OF, bullGamma) {
    super(7, 2, OD, OF, bullGamma)
  }
}

module.exports.BD = BD;