Instruction = require("./instruction").Instruction

class Operation extends Instruction {
  constructor(TO, AD, OD, OF, bullGamma) {
    let of = OF
    if (OD >= OF && AD !== 0 && TO !== 0 && TO !== 1 && TO !== 7) {
      of = 12;
    }
    super(TO, AD, OD, of, bullGamma);
    this.hexString = TO.toString(16) + AD.toString(16) + OD.toString(16) + OF.toString(16);
  }
}

module.exports.Operation = Operation;