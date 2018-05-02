Instruction = require("./instruction").Instruction

class NOP extends V {
  constructor(bullGamma) {
    super(0, 0, 0, bullGamma)
  }

  execute() {
    console.log("NOP")
  }
}

module.exports.NOP = NOP;
