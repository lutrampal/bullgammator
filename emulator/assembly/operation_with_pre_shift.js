Operation = require("./operation").Operation

class OperationWithPreShift extends Operation {

  execute() {
    if (this.AD !== 0) {
      if (this.bullGamma.md - this.OD > 0){
        for (let i = 0; i < this.bullGamma.md - this.OD; ++i) {
          this.bullGamma.md = (this.bullGamma.md - 1)
          this.bullGamma.getMemory(1).shiftRight()
        }
      } else {
        for (let i = 0; i < this.OD - this.bullGamma.md; ++i) {
          this.bullGamma.getMemory(1).shiftLeft()
        }
      }
      this.bullGamma.md = this.OD
    }
    this.exeInstructionLogic()
  }

  exeInstructionLogic() {
    throw new Error('You have to implement the method exeInstructionLogic.');
  }

}

module.exports.OperationWithPreShift = OperationWithPreShift;