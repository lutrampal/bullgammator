DrumTransfer = require("./drumTransfer").DrumTransfer

class BT extends DrumTransfer {
  constructor(AD, OD, OF, bullGamma) {
    super(2, AD, OD, OF, bullGamma)
  }

}

module.exports.BT = BT;