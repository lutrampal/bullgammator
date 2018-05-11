DrumTransfer = require("./drumTransfer").DrumTransfer

const NB_OCTADS_PER_GROUP = require('../machine/constants').NB_OCTADS_PER_GROUP
const NB_MEMORY_PER_OCTAD = require('../machine/constants').NB_MEMORIES_PER_OCTAD
const NB_BLOCKS_PER_MEMORY = require("../machine/constants").NB_BLOCKS_PER_MEMORY

class BT extends DrumTransfer {
  constructor(AD, OD, OF, bullGamma) {
    super(2, AD, OD, OF, bullGamma)
  }

  _transfer(nbGroup, trackGroup, nbTrack, nbBlock) {
    for (let i = 0; i < NB_OCTADS_PER_GROUP; ++i) {
      for (let j = 0; j < NB_MEMORY_PER_OCTAD; ++j) {
        trackGroup.tracks[nbTrack].blocks[nbBlock].octads[i].getMemory(j).copyBlockValues(
          this.bullGamma.groups[nbGroup].octads[i].getMemory(j), 0, NB_BLOCKS_PER_MEMORY, true)
      }
    }
  }
}

module.exports.BT = BT;