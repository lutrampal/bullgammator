Operation = require("./operation").Operation
Memory = require("../machine/memory").Memory
NB_BLOCKS_PER_MEMORY = require("../machine/memory").NB_BLOCKS_PER_MEMORY

class MC extends Operation {
  constructor(AD, OD, OF, bullGamma) {
    super(14, AD, OD, OF, bullGamma)
  }

  execute() {
    let m1m2 = new Memory(0, this.bullGamma, NB_BLOCKS_PER_MEMORY*2)
    let m1 = this.bullGamma.getMemory(1)
    let m2 = this.bullGamma.getMemory(2)
    m1m2.copyBlockValues(m1, 0, NB_BLOCKS_PER_MEMORY)
    for (let i = 0; i < NB_BLOCKS_PER_MEMORY; ++i) {
      m1m2.shiftLeft()
    }
    m1m2.copyBlockValues(m2, 0, NB_BLOCKS_PER_MEMORY)
    if (this.AD > 0) {
      let mb = this.bullGamma.getMemory(this.AD)
      m1m2.multiply(mb, this.OD, this.OF)
    } else {
      m1m2.multiplyValue(this.OF, this.OD + NB_BLOCKS_PER_MEMORY)
    }
    for (let i = 0; i < NB_BLOCKS_PER_MEMORY; ++i) {
      m1.blocks[i] = m1m2.blocks[i + NB_BLOCKS_PER_MEMORY]
      m2.blocks[i] = m1m2.blocks[i]
    }
  }
}

module.exports.MC = MC;