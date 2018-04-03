OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class CN extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(9, AD, OD, OF, bullGamma)
  }
}

module.exports.CN = CN;