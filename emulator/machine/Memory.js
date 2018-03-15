class Memory {
  constructor(id, nbBlocks, bullGamma) {
    this.id = id;
    this.blocks = new Array(nbBlocks);
    this.bullGamma = bullGamma;
  }

  getMode() {
    return bullGamma.getMemoryMode();
  }

  add(other) {
    if (this.getMode() === 2) {
      this._binaryAdd(other);
    }
    if (this.getMode() === 10) {
      this._decimalAdd(other);
    }
  }

  sub(other) {

  }

  toString() {
    let str = "";
    this.blocks.forEach(function (block) {
      str = block.toString(16) + str;
    })
    return str;
  }

  _binaryAdd(other) {
    let carry = 0;
    for (i = 0; i < 12; ++i) {
      this.blocks[i] += other.blocks[i] + carry;
      if (this.blocks[i] > 15) {
      }
    }
  }

  _decimalAdd(other) {

  }
}