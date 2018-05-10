DrumTransfer = require("./drumTransfer").DrumTransfer

class TB extends DrumTransfer {
  constructor(AD, OD, OF, bullGamma) {
    super(2, AD, OD, OF, bullGamma)
  }
}

module.exports.TB = TB;