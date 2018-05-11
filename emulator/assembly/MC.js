BigDivOrMult = require("./big_div_or_mult").BigDivOrMult
Memory = require("../machine/memory").Memory
NB_CHRS_PER_WORD = require("../machine/constants").NB_CHRS_PER_WORD

class MC extends BigDivOrMult {
  constructor(AD, OD, OF, bullGamma) {
    super(14, AD, OD, OF, bullGamma)
  }

  _compute(m1m2, mb) {
    m1m2.multiply(mb, this.OD, this.OF)
  }

  _computeValue(m1m2) {
    m1m2.multiplyValue(this.OF, this.OD + NB_CHRS_PER_WORD)
  }

}

module.exports.MC = MC;