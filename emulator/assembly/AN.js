OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class AN extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(10, AD, OD, OF, bullGamma)
  }
}

module.exports.AN = AN;
