Operation = require("./operation").Operation

class CO extends Operation {
  constructor(OF, bullGamma) {
    super(1, 12, 0, OF, bullGamma)
  }

  execute() {
    if (this.OF > 7) {
      throw "incorrect instruction for TO = 1, AD = C: got OF = " + OF;
    }
    this.bullGamma.currentOctad = this.OF;
  }
}

module.exports.CO = CO;
