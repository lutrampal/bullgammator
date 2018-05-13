Instruction = require("./instruction").Instruction

class VCS extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }

	execute() {
		switch (this.AD) {
			case 0:
				// wait systematicaly for a drum transfer to finish
				// Not implemented
				break;
			case 1:
				// wait for a drum transfer to finish if jumping to the same series
				// not implemented
				this.bullGamma.rnl1 = (this.bullGamma.ns << 6) + this.bullGamma.nextLine();
				break;
			case 2:
				// wait for a drum transfer to finish if jumping to the same series
				// not implemented
				this.bullGamma.rnl2 = (this.bullGamma.ns << 6) + this.bullGamma.nextLine();
				break;
			case 3:
				// wait for a drum transfer to finish if jumping to the same series
				// not implemented
				break;
			default:
				throw "Invalid value for AD: " + this.AD;
		}
		this.bullGamma.ns = this.OF % 4;
		this.bullGamma.nl = (this.OD << 2) + (this.OF >> 2);
	}
}

module.exports.VCS = VCS;
