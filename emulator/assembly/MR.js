OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class MR extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(12, AD, OD, OF, bullGamma)
  }
}

module.exports.MR = MR;