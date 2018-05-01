Operation = require("./operation").Operation

class OperationWithPreShift extends Operation {

  execute() {
    if (this.AD !== 0) {
      if (this.bullGamma.md - this.OD > 0){
        let shift_nb = this.bullGamma.md - this.OD;
        for (let i = 0; i < shift_nb; ++i) {
          this.bullGamma.md = (this.bullGamma.md - 1);
          this.bullGamma.getMemory(1).shiftRight();
        }
      } else {
        let shift_nb = this.OD - this.bullGamma.md;
        for (let i = 0; i < shift_nb; ++i) {
          this.bullGamma.getMemory(1).shiftLeft();
        }
      }
      this.bullGamma.md = this.OD;
    }
    this.exeInstructionLogic();
  }

  exeInstructionLogic() {
    throw new Error('You have to implement the method exeInstructionLogic.');
  }

}

module.exports.OperationWithPreShift = OperationWithPreShift;
