Instruction = require("./instruction").Instruction

class Operation extends Instruction {
  constructor(TO, AD, OD, OF, bullGamma) {
    if (OD >= OF) {
      OF = 12;
    }
    super(TO, AD, OD, OF, bullGamma);
  }
}

module.exports.Operation = Operation;