OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class DR extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(13, AD, OD, OF, bullGamma)
  }
}

module.exports.DR = DR;