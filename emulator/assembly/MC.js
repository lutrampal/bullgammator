OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class MC extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(14, AD, OD, OF, bullGamma)
  }
}

module.exports.MC = MC;