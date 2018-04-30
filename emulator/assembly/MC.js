BigDivOrMult = require("./big_div_or_mult").BigDivOrMult
Memory = require("../machine/memory").Memory
NB_BLOCKS_PER_MEMORY = require("../machine/constants").NB_BLOCKS_PER_MEMORY

class MC extends BigDivOrMult {
  constructor(AD, OD, OF, bullGamma) {
    super(14, AD, OD, OF, bullGamma)
  }

  compute(m1m2, mb) {
    m1m2.multiply(mb, this.OD, this.OF)
  }

  computeValue(m1m2) {
    m1m2.multiplyValue(this.OF, this.OD + NB_BLOCKS_PER_MEMORY)
  }

}

module.exports.MC = MC;