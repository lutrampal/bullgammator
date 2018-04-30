SmallDivOrMultOperation = require("./small_div_or_mult").SmallDivOrMult

class MR extends SmallDivOrMultOperation {
  constructor(AD, OD, OF, bullGamma) {
    super(12, AD, OD, OF, bullGamma)
  }

  compute(mb) {
    this.bullGamma.getMemory(1).multiply(mb, this.OD, this.OF)
  }

  computeValue() {
    this.bullGamma.getMemory(1).multiplyValue(this.OF, this.OD)
  }

}

module.exports.MR = MR