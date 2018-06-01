Operation = require("./operation").Operation

/**
 * Abstract class for instructions with pre-shift
 */
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
    this._exeInstructionLogic();
  }

  /**
   * Abstract method, called by #execute() after the shift is done
   * @protected
   */
  _exeInstructionLogic() {
    throw new Error('You have to implement the method _exeInstructionLogic().');
  }

}

module.exports.OperationWithPreShift = OperationWithPreShift;
