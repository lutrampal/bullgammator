BigDivOrMult = require("./big_div_or_mult").BigDivOrMult

class DC extends BigDivOrMult {
  constructor(AD, OD, OF, bullGamma) {
    super(15, AD, OD, OF, bullGamma)
  }

  _compute(m1m2, mb) {
    m1m2.divide(mb, this.OD, this.OF)
  }

  _computeValue(m1m2) {
    m1m2.divideValue(this.OF, this.OD)
  }

}

module.exports.DC = DC;