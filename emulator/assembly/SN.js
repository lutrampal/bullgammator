OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class SN extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(11, AD, OD, OF, bullGamma)
  }
}

module.exports.SN = SN;