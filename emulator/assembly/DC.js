OperationWithPreShift = require("./operation_with_pre_shift").OperationWithPreShift

class DC extends OperationWithPreShift {
  constructor(AD, OD, OF, bullGamma) {
    super(15, AD, OD, OF, bullGamma)
  }
}

module.exports.DC = DC;