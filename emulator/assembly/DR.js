SmallDivOrMult = require("./small_div_or_mult").SmallDivOrMult

class DR extends SmallDivOrMult {
  constructor(AD, OD, OF, bullGamma) {
    super(12, AD, OD, OF, bullGamma)
  }

  _compute(mb) {
    this.bullGamma.getMemory(1).divide(mb, this.OD, this.OF)
  }

  _computeValue() {
    this.bullGamma.getMemory(1).divideValue(this.OF, this.OD)
  }

}

module.exports.DR = DR