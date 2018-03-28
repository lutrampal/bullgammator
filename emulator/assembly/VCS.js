Operation = require("./operation").Operation

class VCS extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }
}

module.exports.VCS = VCS;